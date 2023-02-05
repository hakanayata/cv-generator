from flask import Flask, redirect, render_template, request, make_response, flash, session
from flask_session import Session
from fpdf import FPDF
from datetime import date, datetime
from PIL import Image
import os
from werkzeug.utils import secure_filename

# configure application
app = Flask(__name__)

# ! for local
# UPLOAD_FOLDER = 'static'
# ! for PythonAnywhere /home/<username>/<project name>/static
UPLOAD_FOLDER = '/home/cvgenerator/cv-generator/static'
ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg'}

# ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True
# upload folder
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
# set max limit for file upload (rather allowed payload) to 10MB
app.config["MAX_CONTENT_LENGTH"] = 10 * 1000 * 1000

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


# ensure responses aren't cached
@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/", methods=["GET", "POST"])
def main():

    # * if user reaches the page via GET, as by clicking a link or redirect()
    # * GET carries req parameter appended in URL string
    if request.method == "GET":
        return render_template("index.html")

    # * if user reaches the page via POST
    # * POST carries request param. in message body
    elif request.method == "POST":

        # PERSONAL INFORMATION
        try:
            first_name, last_name, address, phone_number, email = get_personal_info()
        except:
            flash('Missing field in "Personal Info" section!')
            return redirect("/")

        try:
            picture_name = get_picture()
        except:
            flash('Missing image file!')
            return redirect("/")

        # TARGET JOB TITLE
        try:
            target_job_title = get_target_job_title()
        except:
            flash('Missing "Target Job Title" field!')
            return redirect("/")

        # EXPERIENCE
        try:
            job_titles, companies, job_addresses, formatted_start_exps, formatted_end_exps, exp_durations = get_experience()
        except:
            flash('Missing field in "EXPERIENCE" section!')
            return redirect("/")

        # EDUCATION
        try:
            schools, degrees, study_fields, formatted_start_edus, formatted_end_edus = get_education()
        except:
            flash('Missing field in "EDUCATION" section!')
            return redirect("/")

        # CAREER OBJECTIVE
        career_objective = get_objective()

        # SKILLS
        try:
            skills = get_skills()
        except:
            flash('Missing "Skills" field!')
            return redirect("/")

        # create an instance of FPDF class
        pdf = FPDF(orientation="P", unit="mm", format="A4")
        # Built-in "Helvetica" font, fails to render single quote ' on iOS Safari, needed to add another font
        pdf.add_font(fname="./static/font/DejaVuSans.ttf")
        pdf.add_font(fname="./static/font/DejaVuSans-Bold.ttf")
        # create an empty page
        pdf.add_page()
        # ? PERSONAL INFORMATION
        # ! Picture
        pdf.set_font("DejaVuSans-Bold", "", size=24)
        pdf.set_fill_color(20, 20, 70)
        pdf.set_text_color(250, 250, 250)
        pdf.cell(w=190, h=44,
                 align="C", fill=True, new_x="LMARGIN", new_y="NEXT")
        # get image size with PILLOW
        img = Image.open(f"{UPLOAD_FOLDER}/{picture_name}")
        width, height = img.size
        # calculate the constant, that convert the picture to have a desired height of 40 mm
        constant = height / 40
        # calculate the width with that constant
        width = width / constant
        # set image horizontally in the middle
        pdf.image(f"{UPLOAD_FOLDER}/{picture_name}", x=(210/2) - width/2, y=14,
                  h=40, alt_text="profile picture")
        # pdf.round_clip(x=10, y=10, r=50)

        # ! Name
        pdf.set_font("DejaVuSans-Bold", "", size=24)
        pdf.set_fill_color(20, 20, 70)
        pdf.set_text_color(250, 250, 250)
        # page width 210mm but default margin 1cm from left + right
        pdf.cell(
            w=190, h=20, txt=f"{first_name} {last_name}", align="C", fill=True, new_x="LMARGIN", new_y="NEXT")

        # ! Contact
        pdf.set_font("DejaVuSans", "", size=10)
        pdf.set_fill_color(120, 20, 70)
        pdf.set_text_color(250, 250, 250)
        pdf.cell(
            w=190, h=6, txt=f"{address} | {phone_number} | {email}", align="C", fill=True, new_x="LMARGIN", new_y="NEXT")

        # line break
        pdf.ln(4)
        # ! Target Job Title
        pdf.set_font("DejaVuSans-Bold", "", size=16)
        pdf.set_text_color(20, 20, 70)
        pdf.cell(w=190, h=10, txt=f"{target_job_title}", align="C",
                 new_x="LMARGIN", new_y="NEXT")
        pdf.ln(4)

        # ? CAREER OBJECTIVE
        if career_objective:
            pdf.set_font("DejaVuSans", "", size=12)
            pdf.set_fill_color(240, 240, 240)
            pdf.set_text_color(20, 20, 20)
            pdf.multi_cell(w=190, h=8, txt=f"{career_objective}", border=1, fill=True,
                           align="L", new_x="LMARGIN", new_y="NEXT")
            # line break
            pdf.ln(4)

        # ? EXPERIENCE
        # ! title
        pdf.set_font("DejaVuSans-Bold", "", size=14)
        pdf.set_fill_color(10, 10, 50)
        pdf.set_text_color(250, 250, 250)
        pdf.cell(w=190, h=8, txt=f"EXPERIENCE", align="C",
                 fill=True, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(4)

        # iterate over experiences list (length is same for each list, job_titles taken in this case)
        for i in range(len(job_titles)):
            # ! job title
            pdf.set_font("DejaVuSans-Bold", "", size=12)
            pdf.set_fill_color(240, 240, 240)
            pdf.set_text_color(40, 40, 40)
            pdf.cell(w=190, h=6, txt=f"{job_titles[i]}", align="L",
                     fill=True, new_x="LMARGIN", new_y="NEXT")
            # ! company, adress, dates, duration
            pdf.set_font("DejaVuSans", "", size=12)
            pdf.set_text_color(20, 20, 70)
            pdf.cell(w=190, h=6, txt=f"{companies[i]} | {job_addresses[i]}",
                     align="L", new_x="LMARGIN", new_y="NEXT")
            pdf.cell(w=190, h=6, txt=f"{formatted_start_exps[i]} - {formatted_end_exps[i]} | {exp_durations[i]}",
                     align="L", new_x="LMARGIN", new_y="NEXT")

            pdf.ln(2)

        # ? EDUCATION
        # ! title
        pdf.set_font("DejaVuSans-Bold", "", size=14)
        pdf.set_fill_color(10, 10, 50)
        pdf.set_text_color(250, 250, 250)
        pdf.cell(w=190, h=8, txt=f"EDUCATION", align="C",
                 fill=True, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(4)

        # iterating over any of the list returned from get_education() function
        # because all of them have the same length
        for i in range(len(schools)):
            # ! school
            pdf.set_font("DejaVuSans-Bold", "", size=12)
            pdf.set_fill_color(240, 240, 240)
            pdf.set_text_color(40, 40, 40)
            pdf.cell(w=190, h=6, txt=f"{schools[i]}", align="L",
                     fill=True, new_x="LMARGIN", new_y="NEXT")

            # ! degree, field, dates
            pdf.set_font("DejaVuSans", "", size=12)
            pdf.set_text_color(20, 20, 70)
            pdf.cell(w=190, h=6, txt=f"{degrees[i]}, {study_fields[i]}",
                     align="L", new_x="LMARGIN", new_y="NEXT")
            pdf.cell(w=190, h=6, txt=f"{formatted_start_edus[i]} - {formatted_end_edus[i]}",
                     align="L", new_x="LMARGIN", new_y="NEXT")

            pdf.ln(2)

        # ? SKILLS
        # ! title
        pdf.set_font("DejaVuSans-Bold", "", size=14)
        pdf.set_fill_color(10, 10, 50)
        pdf.set_text_color(250, 250, 250)
        pdf.cell(w=190, h=8, txt=f"SKILLS", align="C",
                 fill=True, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(4)

        # skill | skill | skill
        pdf.set_font("DejaVuSans", "", size=12)
        pdf.set_text_color(20, 20, 70)
        pdf.multi_cell(w=190, h=8, txt=f"{skill_formatter(skills)}",
                       align="L", new_x="LMARGIN", new_y="NEXT")

        # ? DELETE UPLOADED IMAGE FILE
        os.remove(f"{UPLOAD_FOLDER}/{picture_name}")

        # ? END
        # title of pdf
        pdf.set_title(f"{last_name}-CV")
        response = make_response(pdf.output())
        response.headers["Content-Type"] = "application/pdf"
        return response


def allowed_file(filename):
    """Return true if extension is allowed"""
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def get_education():
    """Returns education details for multiple education sections"""
    formatted_start_edus = []
    formatted_end_edus = []

    schools = request.form.getlist("school")

    degrees = request.form.getlist("degree")

    study_fields = request.form.getlist("study-field")

    start_educations = request.form.getlist("start-edu")

    end_educations = request.form.getlist("end-edu")
    # iterate over every education start and end dates
    for i in range(len(start_educations)):
        formatted_start_edus.append(date_formatter(start_educations[i]))
        formatted_end_edus.append(date_formatter(end_educations[i]))

    print(f"{start_educations}")
    print(f"{end_educations}")

    return schools, degrees, study_fields, formatted_start_edus, formatted_end_edus


def get_experience():
    """Returns experience details for multiple experience sections"""
    # initial lists for multiple inputs
    formatted_start_exps = []
    formatted_end_exps = []
    exp_durations = []

    job_titles = request.form.getlist("job-title")

    companies = request.form.getlist("company")

    job_addresses = request.form.getlist("job-address")

    start_experiences = request.form.getlist("start-exp")

    end_experiences = request.form.getlist("end-exp")
    for i in range(len(start_experiences)):
        formatted_start_exps.append(date_formatter(start_experiences[i]))
        formatted_end_exps.append(date_formatter(end_experiences[i]))
        exp_durations.append(get_duration(
            start_experiences[i], end_experiences[i]))

    return job_titles, companies, job_addresses, formatted_start_exps, formatted_end_exps, exp_durations


def get_personal_info():
    """Returns personal information"""
    # PERSONAL INFORMATION
    first_name = request.form.get("firstname").strip().upper()
    last_name = request.form.get("lastname").strip().upper()
    address = request.form.get("address").strip()
    phone_number = request.form.get("phonenumber").strip()
    email = request.form.get("email")
    return (first_name, last_name, address, phone_number, email)


def date_formatter(s):
    """Converts YYYY-MM into MM.YYYY"""
    year, month = s.split("-")
    return f"{int(month):02}.{year}"


# ! check if allowed_file() and get_picture() works
# ! when there's no picture or different format uploaded

def get_picture():
    """Saves and image and returns the name of img file"""
    file = request.files["picture"]
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(
            app.config['UPLOAD_FOLDER'], filename))
        return filename
    else:
        flash("Must provide image file!")
        return redirect("/")


def get_skills():
    """Returns multiple inputs from skills section"""
    skills = request.form.getlist("skill")

    return skills


def get_target_job_title():
    """Returns target job title"""
    # TARGET JOB TITLE
    target_job_title = request.form.get("target-job-title").strip()
    return target_job_title


def get_objective():
    """Returns career objective"""
    # CAREER OBJECTIVE
    objective = request.form.get("objective").strip()
    return objective


def get_duration(date1, date2):
    """Calculates the duration between two dates"""

    try:
        year1, month1 = date1.split("-")
        year2, month2 = date2.split("-")
        difference_in_months = int(month2) - int(month1) + 1
    except ValueError:
        raise ValueError
    except TypeError:
        raise TypeError
    except AttributeError:
        raise AttributeError
    else:
        # if same year, returns difference btw months
        if year1 == year2 and not difference_in_months == 12:
            return f"{difference_in_months} {'months' if difference_in_months > 1 else 'month'}"

        # if different years, returns ? years + ? months
        else:
            d1 = datetime.strptime(date1, "%Y-%m")
            d2 = datetime.strptime(date2, "%Y-%m")
            diff_in_years = d2.year - d1.year
            diff_in_months = d2.month - d1.month + 1
            if diff_in_months == 12:
                diff_in_years += 1
                diff_in_months = 0

            return f"{diff_in_years} {'years' if diff_in_years > 1 else 'year'}{', ' if diff_in_months > 0 else ''}{diff_in_months if diff_in_months > 0 else ''}{' ' if diff_in_months > 0 else ''}{'month' if diff_in_months == 1 else ''}{'months' if diff_in_months > 1 else ''}"


def skill_formatter(ls):
    skills_str = ''

    if len(ls) == 1:
        return ls[0]
    else:
        for i in range(len(ls)-1):
            skills_str += ls[i].strip() + ' | '

        skills_str += ls[-1].strip()

        return skills_str


if __name__ == "__main__":
    main()
