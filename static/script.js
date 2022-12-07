// refrence: https://www.geeksforgeeks.org/how-to-create-a-form-dynamically-with-the-javascript/

// todo: dynamic experience form

// select experience div and 'add new' button
const exp_section = document.getElementById("accordion-body-exp")
const addBtn = document.getElementById("add-exp")

// number of times pressed
let count_extra_exp = 0

// ! removable
// hidden input for extra experience counter
// let exp_counter = document.createElement("input")
// exp_counter.setAttribute("value", `${count_extra_exp}`)
// exp_counter.setAttribute("style", "display: none;")
// exp_counter.setAttribute("name", "exp-counter")
// exp_section.appendChild(exp_counter)

addBtn.addEventListener('click', () => {

    // max 4 extra exp allowed
    if (count_extra_exp < 4) {


        // hr between each exp
        let hr = document.createElement("hr")
        hr.setAttribute("class", "my-4 text-secondary w-75")
        // JOB TITLE
        // label element for job title
        let label_jt = document.createElement("label")
        label_jt.innerHTML = "Job Title"
        label_jt.setAttribute("class", "text-secondary")
        // input element for job title
        let job_title = document.createElement("input")
        job_title.setAttribute("class", "form-control my-2 w-auto")
        job_title.setAttribute("type", "text")
        job_title.setAttribute("name", "job-title")
        // COMPANY
        // label el for company
        let label_company = document.createElement("label")
        label_company.innerHTML = "Company"
        label_company.setAttribute("class", "text-secondary")
        // input el for company
        let company = document.createElement("input")
        company.setAttribute("class", "form-control my-2 w-auto")
        company.setAttribute("type", "text")
        company.setAttribute("name", "company")
        // JOB / EXPERIENCE ADDRESS
        // label el for job-address
        let label_address = document.createElement("label")
        label_address.innerHTML = "City, State, Country"
        label_address.setAttribute("class", "text-secondary")
        // input el for job-address
        let job_address = document.createElement("input")
        job_address.setAttribute("class", "form-control my-2 w-auto")
        job_address.setAttribute("type", "text")
        job_address.setAttribute("name", "job-address")
        // EXP START DATE
        // label for exp start date
        let label_start_exp = document.createElement("label")
        label_start_exp.innerHTML = "Start date"
        label_start_exp.setAttribute("class", "text-secondary")
        // input for exp start date
        let start_experience = document.createElement("input")
        start_experience.setAttribute("class", "form-control my-2 w-auto")
        start_experience.setAttribute("type", "month")
        start_experience.setAttribute("name", "start-exp")
        // EXP END DATE
        // label for exp end date
        let label_end_exp = document.createElement("label")
        label_end_exp.innerHTML = "End date"
        label_end_exp.setAttribute("class", "text-secondary")
        // input for exp end date
        let end_experience = document.createElement("input")
        end_experience.setAttribute("class", "form-control my-2 w-auto")
        end_experience.setAttribute("type", "month")
        end_experience.setAttribute("name", "end-exp")


        // append new elements into experience section
        exp_section.appendChild(hr)
        exp_section.appendChild(label_jt)
        exp_section.appendChild(job_title)
        exp_section.appendChild(label_company)
        exp_section.appendChild(company)
        exp_section.appendChild(label_address)
        exp_section.appendChild(job_address)
        exp_section.appendChild(label_start_exp)
        exp_section.appendChild(start_experience)
        exp_section.appendChild(label_end_exp)
        exp_section.appendChild(end_experience)

        count_extra_exp++

    }
    else {
        window.alert("Max. number of experiences: 5")
    }

})

// todo: dynamic education form

// select eduacation div and 'add new' button
const edu_section = document.getElementById("accordion-body-edu")
const addBtnEdu = document.getElementById("add-edu")

// number of education section
let count_extra_edu = 0

// ! removable
// exp counter
// let edu_counter = document.createElement("input")
// edu_counter.setAttribute("value", `${count_extra_edu + 1}`)
// edu_counter.setAttribute("style", "display: none;")
// edu_counter.setAttribute("name", "edu-counter")
// edu_section.appendChild(edu_counter)

addBtnEdu.addEventListener('click', () => {

    // max 4 extra exp allowed
    if (count_extra_edu < 4) {



        // hr between each edu
        let hr = document.createElement("hr")
        hr.setAttribute("class", "my-4 text-secondary w-75")
        // SCHOOL
        // label element for school
        let label_school = document.createElement("label")
        label_school.innerHTML = "School"
        label_school.setAttribute("class", "text-secondary")
        // input element for school
        let school = document.createElement("input")
        school.setAttribute("class", "form-control my-2 w-auto")
        school.setAttribute("type", "text")
        school.setAttribute("name", "school")
        // DEGREE
        // label el for degree
        let label_degree = document.createElement("label")
        label_degree.innerHTML = "Degree"
        label_degree.setAttribute("class", "text-secondary")
        // input el for degree
        let degree = document.createElement("input")
        degree.setAttribute("class", "form-control my-2 w-auto")
        degree.setAttribute("type", "text")
        degree.setAttribute("name", "degree")
        // STUDY FIELD
        // label el for job-address
        let label_field = document.createElement("label")
        label_field.innerHTML = "Field of study"
        label_field.setAttribute("class", "text-secondary")
        // input el for job-address
        let study_field = document.createElement("input")
        study_field.setAttribute("class", "form-control my-2 w-auto")
        study_field.setAttribute("type", "text")
        study_field.setAttribute("name", "study-field")
        // EXP START DATE
        // label for exp start date
        let label_start_edu = document.createElement("label")
        label_start_edu.innerHTML = "Start date"
        label_start_edu.setAttribute("class", "text-secondary")
        // input for exp start date
        let start_education = document.createElement("input")
        start_education.setAttribute("class", "form-control my-2 w-auto")
        start_education.setAttribute("type", "month")
        start_education.setAttribute("name", "start-edu")
        // EXP END DATE
        // label for exp end date
        let label_end_edu = document.createElement("label")
        label_end_edu.innerHTML = "End date"
        label_end_edu.setAttribute("class", "text-secondary")
        // input for exp end date
        let end_education = document.createElement("input")
        end_education.setAttribute("class", "form-control my-2 w-auto")
        end_education.setAttribute("type", "month")
        end_education.setAttribute("name", "end-edu")


        // append new elements into experience section
        edu_section.appendChild(hr)
        edu_section.appendChild(label_school)
        edu_section.appendChild(school)
        edu_section.appendChild(label_degree)
        edu_section.appendChild(degree)
        edu_section.appendChild(label_field)
        edu_section.appendChild(study_field)
        edu_section.appendChild(label_start_edu)
        edu_section.appendChild(start_education)
        edu_section.appendChild(label_end_edu)
        edu_section.appendChild(end_education)

        count_extra_edu++

    }
    else {
        window.alert("Max. number of educations: 5")
    }

})


// todo: dynamic skills section

// skills div and add button therein
const skill_section = document.getElementById("accordion-body-skills")
const addBtnSkill = document.getElementById("add-skill")

// extra number of skills
let count_extra_skills = 0

// add new skill input with click of a button
addBtnSkill.addEventListener('click', () => {

    if (count_extra_skills < 15) {

        // SKILLS
        // label element for skill
        let label_skill = document.createElement("label")
        label_skill.innerHTML = "Skill"
        label_skill.setAttribute("class", "text-secondary")

        // input element for skill
        let skill = document.createElement("input")
        skill.setAttribute("class", "form-control my-2 w-auto")
        skill.setAttribute("type", "text")
        skill.setAttribute("name", "skill")

        // append new elements into skills section
        skill_section.appendChild(label_skill)
        skill_section.appendChild(skill)

        count_extra_skills++

    }
    else {
        window.alert("Max. number of skills: 16")
    }

})