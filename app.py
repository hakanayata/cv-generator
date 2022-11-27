from flask import Flask, flash, redirect, render_template, request, make_response
from fpdf import FPDF

# configure application
app = Flask(__name__)

# ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/", methods=["GET", "POST"])
def index():

    if request.method == "GET":
        return render_template("index.html")

    elif request.method == "POST":

        # PERSONAL INFORMATION
        first_name = request.form.get("firstname").upper()
        last_name = request.form.get("lastname").upper()
        address = request.form.get("address").capitalize()
        phone_number = request.form.get("phonenumber").capitalize()
        email = request.form.get("email")

        # TARGET JOB TITLE
        target_job_title = request.form.get("target-job-title").upper()

        # EXPERIENCE
        job_title = request.form.get("job-title").title()
        company = request.form.get("company")
        job_address = request.form.get("job-address")
        start_experience = request.form.get("start-exp")
        formatted_start_year_exp, formatted_start_month_exp = start_experience.split(
            "-")
        end_experience = request.form.get("end-exp")
        formatted_end_year_exp, formatted_end_month_exp = end_experience.split(
            "-")

        pdf = FPDF(orientation="P", unit="mm", format="A4")
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
        # ! company
        pdf.set_font("Helvetica", "", size=12)
        pdf.set_text_color(20, 20, 70)
        pdf.cell(w=190, h=6, txt=f"{company} - {job_address} | {int(formatted_start_month_exp):02}.{formatted_start_year_exp} - {int(formatted_end_month_exp):02}.{formatted_end_year_exp}",
                 align="L", new_x="LMARGIN", new_y="NEXT")

        # ? END
        # title of pdf
        pdf.set_title(f"{last_name}-CV")
        response = make_response(pdf.output())
        response.headers["Content-Type"] = "application/pdf"
        return response
