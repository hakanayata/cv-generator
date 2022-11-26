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
        first_name = request.form.get("firstname").upper()
        last_name = request.form.get("lastname").upper()
        address = request.form.get("address").capitalize()
        phone_number = request.form.get("phonenumber").capitalize()
        email = request.form.get("email")

        pdf = FPDF(orientation="P", unit="mm", format="A4")
        pdf.add_page()
        # ! Name
        pdf.set_font("Helvetica", "B", size=24)
        pdf.set_fill_color(20, 20, 100)
        pdf.set_text_color(250, 250, 250)
        # page width 210mm but default margin 1cm from left + right
        pdf.cell(
            w=190, h=12, txt=f"{first_name} {last_name}", align="C", fill=True, new_x="LMARGIN", new_y="NEXT")
        # ! Contact
        pdf.set_font("Helvetica", "", size=12)
        pdf.set_fill_color(20, 20, 100)
        pdf.set_text_color(250, 250, 250)
        pdf.cell(
            w=190, h=6, txt=f"{address} | {phone_number} | {email}", align="C", fill=True)
        # title of pdf
        pdf.set_title(f"{last_name}-CV")
        response = make_response(pdf.output())
        response.headers["Content-Type"] = "application/pdf"
        return response
