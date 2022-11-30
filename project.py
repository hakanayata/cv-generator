from flask import Flask, redirect, render_template, request, make_response
from fpdf import FPDF
from datetime import date, datetime

# configure application
app = Flask(__name__)

# ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True


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

    if request.method == "GET":
        return render_template("index.html")

    elif request.method == "POST":

        # PERSONAL INFORMATION
        first_name, last_name, address, phone_number, email = get_personal_info()

        # TARGET JOB TITLE
        target_job_title = get_target_job_title()

        # EXPERIENCE
        job_title, company, job_address, formatted_start_exp, formatted_end_exp, exp_duration = get_experience()

        # EDUCATION
        school, degree, study_field, formatted_start_edu, formatted_end_edu = get_education()

        # create an instance of FPDF class
        pdf = FPDF(orientation="P", unit="mm", format="A4")
        # create an empty page
        pdf.add_page()
        # ? PERSONAL INFORMATION
        # ! Name
        pdf.set_font("Helvetica", "B", size=24)
        pdf.set_fill_color(20, 20, 70)
        pdf.set_text_color(250, 250, 250)
        # page width 210mm but default margin 1cm from left + right
        pdf.cell(
            w=190, h=12, txt=f"{first_name} {last_name}", align="C", fill=True, new_x="LMARGIN", new_y="NEXT")

        # ! Contact
        pdf.set_font("Helvetica", "", size=9)
        pdf.set_fill_color(20, 20, 70)
        pdf.set_text_color(250, 250, 250)
        pdf.cell(
            w=190, h=6, txt=f"{address} | {phone_number} | {email}", align="C", fill=True, new_x="LMARGIN", new_y="NEXT")

        # line break
        pdf.ln(4)
        # ! Target Job Title
        pdf.set_font("Helvetica", "B", size=16)
        pdf.set_text_color(20, 20, 70)
        pdf.cell(w=190, h=10, txt=f"{target_job_title}", align="C",
                 new_x="LMARGIN", new_y="NEXT")

        pdf.ln(4)

        # ? EXPERIENCE
        # ! title
        pdf.set_font("Helvetica", "B", size=14)
        pdf.set_fill_color(10, 10, 50)
        pdf.set_text_color(250, 250, 250)
        pdf.cell(w=190, h=8, txt=f"EXPERIENCE", align="C",
                 fill=True, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(4)

        # ! job title
        pdf.set_font("Helvetica", "B", size=12)
        pdf.set_fill_color(240, 240, 240)
        pdf.set_text_color(40, 40, 40)
        pdf.cell(w=190, h=6, txt=f"{job_title}", align="L",
                 fill=True, new_x="LMARGIN", new_y="NEXT")
        # ! company, adress, dates, duration
        pdf.set_font("Helvetica", "", size=12)
        pdf.set_text_color(20, 20, 70)
        pdf.cell(w=190, h=6, txt=f"{company} - {job_address} | {formatted_start_exp} - {formatted_end_exp} | {exp_duration}",
                 align="L", new_x="LMARGIN", new_y="NEXT")

        pdf.ln(4)

        # ? EDUCATION
        # ! title
        pdf.set_font("Helvetica", "B", size=14)
        pdf.set_fill_color(10, 10, 50)
        pdf.set_text_color(250, 250, 250)
        pdf.cell(w=190, h=8, txt=f"EDUCATION", align="C",
                 fill=True, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(4)

        # ! school
        pdf.set_font("Helvetica", "B", size=12)
        pdf.set_fill_color(240, 240, 240)
        pdf.set_text_color(40, 40, 40)
        pdf.cell(w=190, h=6, txt=f"{school}", align="L",
                 fill=True, new_x="LMARGIN", new_y="NEXT")

        # ! degree, field, dates
        pdf.set_font("Helvetica", "", size=12)
        pdf.set_text_color(20, 20, 70)
        pdf.cell(w=190, h=6, txt=f"{degree}, {study_field} | {formatted_start_edu} - {formatted_end_edu}",
                 align="L", new_x="LMARGIN", new_y="NEXT")

        # ? END
        # title of pdf
        pdf.set_title(f"{last_name}-CV")
        response = make_response(pdf.output())
        response.headers["Content-Type"] = "application/pdf"
        return response


def get_personal_info():
    """Returns personal information"""
    # PERSONAL INFORMATION
    first_name = request.form.get("firstname").upper()
    last_name = request.form.get("lastname").upper()
    address = request.form.get("address").capitalize()
    phone_number = request.form.get("phonenumber").capitalize()
    email = request.form.get("email")
    return (first_name, last_name, address, phone_number, email)


def get_target_job_title():
    """Returns target job title"""
    # TARGET JOB TITLE
    target_job_title = request.form.get("target-job-title").upper()
    return target_job_title


def get_experience():
    """Returns experience details"""
    # EXPERIENCE
    job_title = request.form.get("job-title").title()
    company = request.form.get("company")
    job_address = request.form.get("job-address")
    start_experience = request.form.get("start-exp")
    end_experience = request.form.get("end-exp")
    formatted_start_exp = date_formatter(start_experience)
    formatted_end_exp = date_formatter(end_experience)
    exp_duration = experience_calculator(start_experience, end_experience)
    return job_title, company, job_address, formatted_start_exp, formatted_end_exp, exp_duration


def get_education():
    """Returns education details"""
    # EDUCATION
    school = request.form.get("school").title()
    degree = request.form.get("degree").capitalize()
    study_field = request.form.get("study-field").title()
    start_education = request.form.get("start-edu")
    end_education = request.form.get("end-edu")
    formatted_start_edu = date_formatter(start_education)
    formatted_end_edu = date_formatter(end_education)
    return school, degree, study_field, formatted_start_edu, formatted_end_edu


def date_formatter(s):
    """Converts YYYY-MM into MM.YYYY"""
    year, month = s.split("-")
    return f"{int(month):02}.{year}"


def experience_calculator(date1, date2):
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


if __name__ == "__main__":
    main()
