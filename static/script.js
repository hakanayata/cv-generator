// reference: https://www.geeksforgeeks.org/how-to-create-a-form-dynamically-with-the-javascript/

const startMonthSelect = document.getElementById("start-month")
const startYearSelect = document.getElementById("start-year")

const endMonthSelect = document.getElementById("end-month")
const endYearSelect = document.getElementById("end-year")

const startMonthSelectEdu = document.getElementById("start-month-edu")
const startYearSelectEdu = document.getElementById("start-year-edu")

const endMonthSelectEdu = document.getElementById("end-month-edu")
const endYearSelectEdu = document.getElementById("end-year-edu")
// these btns will be updated when a section added by user's click
let monthBtns = document.querySelectorAll(".month-btn")
let yearBtns = document.querySelectorAll(".year-btn")

// hidden inputs for backend
const startExp = document.getElementById("start-exp")
const endExp = document.getElementById("end-exp")

// every hidden input
const hiddenDateInputs = document.querySelectorAll(".hid")

// Buttons in EXP section
// select experience div and 'add new' button
const exp_section = document.getElementById("accordion-body-exp")
const addBtn = document.getElementById("add-exp")
const delBtnExp = document.getElementById("delete-exp")

// Buttons in EDU section
// select eduacation div and 'add new' button
const edu_section = document.getElementById("accordion-body-edu")
const addBtnEdu = document.getElementById("add-edu")
const delBtnEdu = document.getElementById("delete-edu")

// extra number of experience section
let count_extra_exp = 0
// extra number of education section
let count_extra_edu = 0
// extra number of skills
let count_extra_skills = 0

// Buttons in SKILLS section
// skills div and add button therein
const skill_section = document.getElementById("accordion-body-skills")
const addBtnSkill = document.getElementById("add-skill")
const delBtnSkill = document.getElementById("delete-skill")

// initial id number for divs of new skills
let idNo = 0
let idNoList = []

// first instance of month + year select options for exp
// that will be showed on page load
populateMonths(startMonthSelect)
populateYears(startYearSelect)
populateMonths(endMonthSelect)
populateYears(endYearSelect)

// first instance of month + year select options for edu
// that will be showed on page load
populateMonths(startMonthSelectEdu)
populateYears(startYearSelectEdu)
populateMonths(endMonthSelectEdu)
populateYears(endYearSelectEdu)

// update dom query everytime a new section added
updateSelectionBtns()
updateHiddenDateValue()

// set hidden inputs default values to `${thisYear}-01`
setDefaultDateHidden()

// initial disabling of delete btns in exp & edu sections
activateDeactivateBtnExp()
activateDeactivateBtnEdu()

// todo: dynamic experience form
addBtn.addEventListener('click', () => {

    // max 4 extra exp allowed
    if (count_extra_exp < 4) {
        // encapsulate newly created elements in a div
        const experience_div = document.createElement("div")
        experience_div.setAttribute("id", "new-experience")

        // hr between each exp
        const hr = document.createElement("hr")
        hr.setAttribute("class", "my-4 text-secondary w-75")

        // JOB TITLE
        // label element for job title
        const label_jt = labelMaker("Job Title")

        // input element for job title
        const job_title = document.createElement("input")
        job_title.setAttribute("class", "form-control my-2 w-auto")
        job_title.setAttribute("type", "text")
        job_title.setAttribute("name", "job-title")

        // COMPANY
        // label el for company
        const label_company = labelMaker("Company")

        // input el for company
        const company = document.createElement("input")
        company.setAttribute("class", "form-control my-2 w-auto")
        company.setAttribute("type", "text")
        company.setAttribute("name", "company")

        // JOB / EXPERIENCE ADDRESS
        // label for job-address
        const label_address = labelMaker("City, State, Country")

        // input el for job-address
        const job_address = document.createElement("input")
        job_address.setAttribute("class", "form-control my-2 w-auto")
        job_address.setAttribute("type", "text")
        job_address.setAttribute("name", "job-address")

        // todo: 2 separate pickers - start exp
        // EXP START DATE
        // label for exp start date
        const label_start_exp = labelMaker(str = "start date")
        const date_picker_start = separate_date_picker_maker('start', 'exp')
        const label_end_exp = labelMaker(str = "end date")
        const date_picker_end = separate_date_picker_maker('end', 'exp')
        // todo:  E   N   D

        // append new elements into experience section
        experience_div.appendChild(hr)
        experience_div.appendChild(label_jt)
        experience_div.appendChild(job_title)
        experience_div.appendChild(label_company)
        experience_div.appendChild(company)
        experience_div.appendChild(label_address)
        experience_div.appendChild(job_address)
        experience_div.appendChild(label_start_exp)
        experience_div.appendChild(date_picker_start)
        experience_div.appendChild(label_end_exp)
        experience_div.appendChild(date_picker_end)
        exp_section.appendChild(experience_div)

        count_extra_exp++

        // setDefaultDateHidden()
        updateSelectionBtns()
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
addBtnEdu.addEventListener('click', () => {

    // max 4 extra exp allowed
    if (count_extra_edu < 4) {

        // encapluslate newly created elements in a div
        const education_div = document.createElement("div")
        education_div.setAttribute("id", "new-education")

        // hr between each edu
        const hr = document.createElement("hr")
        hr.setAttribute("class", "my-4 text-secondary w-75")

        // label element for school
        const label_school = labelMaker("school")

        // input element for school
        const school = document.createElement("input")
        school.setAttribute("class", "form-control my-2 w-auto")
        school.setAttribute("type", "text")
        school.setAttribute("name", "school")

        // DEGREE
        // label el for degree
        const label_degree = labelMaker("degree")

        // input el for degree
        const degree = document.createElement("input")
        degree.setAttribute("class", "form-control my-2 w-auto")
        degree.setAttribute("type", "text")
        degree.setAttribute("name", "degree")

        // STUDY FIELD
        // label el for job-address
        const label_field = labelMaker("field of study")

        // input el for job-address
        const study_field = document.createElement("input")
        study_field.setAttribute("class", "form-control my-2 w-auto")
        study_field.setAttribute("type", "text")
        study_field.setAttribute("name", "study-field")

        // EDU START DATE
        // label for edu start date
        const label_start_edu = labelMaker("start date")
        // inputs for edu start date
        const start_education = separate_date_picker_maker("start", "edu")
        // label for edu end date
        const label_end_edu = labelMaker("end date")
        // inputs for edu end date
        const end_education = separate_date_picker_maker("end", "edu")

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

        updateSelectionBtns()
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
        const label_skill = document.createElement("label")
        label_skill.innerHTML = "Skill"
        label_skill.setAttribute("class", "text-secondary")
        label_skill.setAttribute("style", "display: block;")

        // input element for skill
        const skill = document.createElement("input")
        skill.setAttribute("class", "form-control my-2 w-auto")
        skill.setAttribute("style", "display:inline-block;")
        skill.setAttribute("type", "text")
        skill.setAttribute("name", "skill")
        skill.setAttribute("required", "")

        // delete button
        const delButton = document.createElement("button")
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

    }
    else {
        window.alert("Max. number of skills: 16")
    }

})

function activateDeactivateBtnExp() {
    // Disables btn if no extra section exists
    if (count_extra_exp < 1) {
        delBtnExp.disabled = true
    }
    else {
        delBtnExp.disabled = false
    }
}

function activateDeactivateBtnEdu() {
    // Disables btn if no extra section exists
    if (count_extra_edu < 1) {
        delBtnEdu.disabled = true
    }
    else {
        delBtnEdu.disabled = false
    }

}

function delExtraSkill(id) {
    // Deletes extra skills

    const el = document.getElementById(`new-skill-${id}`)
    el.remove()

    // remove the id from ids list
    idNoList = idNoList.filter(item => item != id)

    count_extra_skills--

}

function populateYears(parent) {
    // creates 60 options inside of select element
    const now = new Date()
    const thisYear = now.getFullYear()

    // make this year, and 60 years before it available in the year selection
    for (let i = 0; i <= 60; i++) {
        const option = document.createElement("option")
        option.setAttribute("value", thisYear - i)
        option.textContent = thisYear - i
        parent.appendChild(option)
    }

}

function populateMonths(parent) {
    // Creates 12 options inside of select element
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement("option")
        option.setAttribute("value", i)
        option.textContent = i
        parent.appendChild(option)
    }
}

function labelMaker(str, color = "primary-emphasis", fw = "fw-normal") {
    // Returns a label
    let label = document.createElement("label")
    label.textContent = `${str.charAt(0).toUpperCase() + str.slice(1)}`
    label.setAttribute("class", `text-${color} ${fw}`)
    return label
}

function separate_date_picker_maker(time, section) {
    // creates 2 separate pickers for each MONTH and YEAR

    let div_separate_date_pickers;

    div_separate_date_pickers = document.createElement("div")
    div_separate_date_pickers.setAttribute("class", "d-flex align-items-center justify-content-start my-2 gap-2")

    const label1 = labelMaker("Month:", "secondary", "fw-light")
    div_separate_date_pickers.appendChild(label1)

    const month_selection = document.createElement("select")
    month_selection.setAttribute("class", "form-select my-2 month-btn w-auto")
    month_selection.setAttribute("name", `${time}-month-${section}`)
    populateMonths(month_selection)
    div_separate_date_pickers.appendChild(month_selection)

    const label2 = labelMaker("Year:", "secondary", "fw-light")
    // left margin for year label
    label2.classList.add("ms-3")
    div_separate_date_pickers.appendChild(label2)

    const year_selection = document.createElement("select")
    year_selection.setAttribute("class", "form-select my-2 year-btn w-auto")
    year_selection.setAttribute("name", `${time}-year-${section}`)
    populateYears(year_selection)
    div_separate_date_pickers.appendChild(year_selection)

    const hiddenStrDate = document.createElement("input")
    hiddenStrDate.setAttribute("class", "d-none form-control w-auto hid")
    hiddenStrDate.setAttribute("name", `${time}-${section}`)
    hiddenStrDate.setAttribute("value", `${String(new Date().getFullYear())}-01`)
    div_separate_date_pickers.appendChild(hiddenStrDate)


    return div_separate_date_pickers

}

function updateHiddenDateValue() {
    // updates hidden inputs value, when user changes the dates 

    let mergedDate = `${String(new Date().getFullYear())}-01`
    mergedDate = mergedDate.split('')

    monthBtns.forEach(btn => {
        btn.addEventListener('change', () => {
            let value = btn.value
            value = value.split('')

            if (value.length === 1) {
                mergedDate[6] = value[0]
            } else {
                for (let i = 0; i < 2; i++) {
                    mergedDate[i + 5] = value[i]
                }
            }
            btn.parentElement.querySelector("input").value = mergedDate.join('')
        })
    })

    yearBtns.forEach(btn => {

        btn.addEventListener('change', () => {
            let value = btn.value
            value = value.split('')
            for (let i = 0; i < 4; i++) {
                mergedDate[i] = value[i]
            }
            btn.parentElement.querySelector("input").value = mergedDate.join('')
        })
    })
}

function updateSelectionBtns() {
    // updates date pickers when new section added
    monthBtns = document.querySelectorAll(".month-btn")
    yearBtns = document.querySelectorAll(".year-btn")
    updateHiddenDateValue()
}

function setDefaultDateHidden() {
    // sets the value of now() to hidden input element
    hiddenDateInputs.forEach(input => {
        input.value = `${String(new Date().getFullYear())}-01`
    })
}


