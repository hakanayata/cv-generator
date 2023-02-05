# CV-Generator 📜
## A web-based application that allows users to create a CV(*Curriculum Vitae*)/Resumé in portable document format (pdf).
### Final Project - Harvard CS50P: Introduction to Programming with Python
#### Watch demo: [YouTube](https://youtu.be/YVBA1FetrXQ)
#### App link: [Python Anywhere](https://cvgenerator.eu.pythonanywhere.com/)

## Description: Web-based app built with Python (Flask), Jinja Templates, JavaScript and Bootstrap.

This web application was made as a [final project](https://cs50.harvard.edu/python/2022/project/) for [Harvard's Introduction to Programming](https://www.edx.org/course/cs50s-introduction-to-programming-with-python) course. The goal was to build a full fledged web application, combining the knowledge obtained from both [CS50](https://www.edx.org/course/introduction-computer-science-harvardx-cs50x) and [CS50P](https://www.edx.org/course/cs50s-introduction-to-programming-with-python) courses.

CV-Generator helps users to create a portable document format (pdf) of a CV (*Curriculum Vitae*) after filling out a single page form.

## Features
- **Personal Information** section where users type their name, address, upload their picture, etc.
- **Target Job Title** section
- **Experience** section where users enter up to five vocational experiences.
- **Education** section allows user to add up to five different educational fields on their CV.
- **Skills** section where users type their skills which make them stand out in the job market.
- **Functions** for formatting data which were also included in unit test:
  - `get_duration()` is a function which takes two dates as arguments and calculates the duration between two dates and returns that duration in years and months.
  - `date_formatter()` is a function which takes a date as an argument in 'YYYY-MM' format and returns a string type of the date in 'MM.YYYY' format.
  - `skill_formatter()` is a function which takes an array of strings of skills as an argument and returns just a single string with pipe '|' added between each skills. 

## Languages & Tools

- Python 3.11
  - [fpdf2](https://pypi.org/project/fpdf2/): library for PDF creation
  - [Pillow](https://pypi.org/project/Pillow/): library for image processing
  - [pytest](https://pypi.org/project/pytest/): framework for unit tests
- Flask 2.2
- Jinja 3.1
- HTML
- CSS
- Bootstrap
- JavaScript
- Visual Studio Code
- GIT & Github
- Google Colab
- iTerm2

## Potential Improvements
- Utilizing a database to keep users data, so they could create CVs swiftly later on.


#### Feedback
You might be able to test this application at: [Python Anywhere](https://cvgenerator.eu.pythonanywhere.com/)
I would appreciate any kind of feedback. (See [***Contact***](https://github.com/hakanayata/cv-generator#contact) below)

## Contact
I'm [Hakan](https://hakanayata.com). You could reach me at info@hakanayata.com


```python
    print("This was CS50P!")
```




