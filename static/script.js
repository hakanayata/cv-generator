// refrence: https://www.geeksforgeeks.org/how-to-create-a-form-dynamically-with-the-javascript/

// todo: dynamic experience form

// select experience div and 'add new' button
const exp_section = document.getElementById("accordion-body-exp")
const addBtn = document.getElementById("add-exp")
const delBtnExp = document.getElementById("delete-exp")

// number of times pressed
let count_extra_exp = 0

function activateDeactivateBtnExp() {
    if (count_extra_exp < 1) {
        delBtnExp.disabled = true
    }
    else {
        delBtnExp.disabled = false
    }
}

activateDeactivateBtnExp()

addBtn.addEventListener('click', () => {

    // max 4 extra exp allowed
    if (count_extra_exp < 4) {
        // encapsulate newly created elements in a div
        let experience_div = document.createElement("div")
        experience_div.setAttribute("id", "new-experience")

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
        experience_div.appendChild(hr)
        experience_div.appendChild(label_jt)
        experience_div.appendChild(job_title)
        experience_div.appendChild(label_company)
        experience_div.appendChild(company)
        experience_div.appendChild(label_address)
        experience_div.appendChild(job_address)
        experience_div.appendChild(label_start_exp)
        experience_div.appendChild(start_experience)
        experience_div.appendChild(label_end_exp)
        experience_div.appendChild(end_experience)
        exp_section.appendChild(experience_div)

        count_extra_exp++

        activateDeactivateBtnExp()

    }
    else {
        window.alert("Max. number of experiences: 5")
    }

})

delBtnExp.addEventListener('click', () => {
    if (count_extra_exp >= 1) {
        el = document.getElementById("new-experience")
        el.remove()

        count_extra_exp--

        activateDeactivateBtnExp()
    }
})


// todo: dynamic education form

// select eduacation div and 'add new' button
const edu_section = document.getElementById("accordion-body-edu")
const addBtnEdu = document.getElementById("add-edu")
const delBtnEdu = document.getElementById("delete-edu")

// number of education section
let count_extra_edu = 0

function activateDeactivateBtnEdu() {
    if (count_extra_edu < 1) {
        delBtnEdu.disabled = true
    }
    else {
        delBtnEdu.disabled = false
    }

}

activateDeactivateBtnEdu()

addBtnEdu.addEventListener('click', () => {

    // max 4 extra exp allowed
    if (count_extra_edu < 4) {

        // encapluslate newly created elements in a div
        let education_div = document.createElement("div")
        education_div.setAttribute("id", "new-education")

        // hr between each edu
        let hr = document.createElement("hr")
        hr.setAttribute("class", "my-4 text-secondary w-75")

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
        education_div.appendChild(hr)
        education_div.appendChild(label_school)
        education_div.appendChild(school)
        education_div.appendChild(label_degree)
        education_div.appendChild(degree)
        education_div.appendChild(label_field)
        education_div.appendChild(study_field)
        education_div.appendChild(label_start_edu)
        education_div.appendChild(start_education)
        education_div.appendChild(label_end_edu)
        education_div.appendChild(end_education)
        edu_section.appendChild(education_div)

        count_extra_edu++

        activateDeactivateBtnEdu()

    }
    else {
        window.alert("Max. number of educations: 5")
    }

})

delBtnEdu.addEventListener('click', () => {
    if (count_extra_edu >= 1) {
        el = document.getElementById("new-education")
        el.remove()

        count_extra_edu--

        activateDeactivateBtnEdu()
    }

})


// todo: dynamic skills form

// skills div and add button therein
const skill_section = document.getElementById("accordion-body-skills")
const addBtnSkill = document.getElementById("add-skill")
const delBtnSkill = document.getElementById("delete-skill")

// extra number of skills
let count_extra_skills = 0

// initial id number for divs of new skills
let idNo = 0
let idNoList = []

// add new skill input with click of a button
addBtnSkill.addEventListener('click', () => {

    if (count_extra_skills < 15) {
        // SKILLS
        // encapsulate newly created elements in a div
        let skill_div = document.createElement("div")

        // if id already exist in the list, new id should be the max val in array plus one
        for (let i = 0; i < idNoList.length; i++) {
            if (idNo === idNoList[i]) {
                idNo = Math.max(...idNoList) + 1
            }
            else {
                idNo = idNo
            }
        }

        skill_div.setAttribute("id", `new-skill-${idNo}`)
        idNoList.push(idNo)

        // label element for skill
        let label_skill = document.createElement("label")
        label_skill.innerHTML = "Skill"
        label_skill.setAttribute("class", "text-secondary")
        label_skill.setAttribute("style", "display: block;")

        // input element for skill
        let skill = document.createElement("input")
        skill.setAttribute("class", "form-control my-2 w-auto")
        skill.setAttribute("style", "display:inline-block;")
        skill.setAttribute("type", "text")
        skill.setAttribute("name", "skill")

        // delete button
        let delButton = document.createElement("button")
        delButton.setAttribute("class", "btn btn-sm fs-3 fw-bolder mx-2 text-danger w-auto")
        delButton.setAttribute("type", "button")
        delButton.setAttribute("id", `${idNo}`)
        delButton.setAttribute("onclick", "delExtraSkill(this.id)")
        delButton.innerHTML = "⛌"

        // append new elements into skills section
        skill_div.appendChild(label_skill)
        skill_div.appendChild(skill)
        skill_div.appendChild(delButton)
        skill_section.appendChild(skill_div)

        count_extra_skills++
        // idNo++
        console.log(idNoList)

    }
    else {
        window.alert("Max. number of skills: 16")
    }

})


function delExtraSkill(id) {

    el = document.getElementById(`new-skill-${id}`)
    el.remove()

    // remove the id from ids list
    idNoList = idNoList.filter(item => item != id)

    count_extra_skills--

    console.log(idNoList)

}