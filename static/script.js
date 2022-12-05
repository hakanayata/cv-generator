// refrence: https://www.geeksforgeeks.org/how-to-create-a-form-dynamically-with-the-javascript/


// select experience div and 'add new' button
const exp_section = document.getElementById("accordion-body-exp")
const addBtn = document.getElementById("add-exp")
// number of times pressed
let times_pressed = 0

addBtn.addEventListener('click', () => {
    if (times_pressed < 2) {

        // new div
        // let new_div = document.createElement("div")
        // new_div.setAttribute("class", "my-2, accordion-body")

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
        job_title.setAttribute("name", `job-title${times_pressed}`)
        // COMPANY
        // label el for company
        let label_company = document.createElement("label")
        label_company.innerHTML = "Company"
        label_company.setAttribute("class", "text-secondary")
        // input el for company
        let company = document.createElement("input")
        company.setAttribute("class", "form-control my-2 w-auto")
        company.setAttribute("type", "text")
        company.setAttribute("name", `company${times_pressed}`)
        // JOB / EXPERIENCE ADDRESS
        // label el for job-address
        let label_address = document.createElement("label")
        label_address.innerHTML = "City, State, Country"
        label_address.setAttribute("class", "text-secondary")
        // input el for job-address
        let job_address = document.createElement("input")
        job_address.setAttribute("class", "form-control my-2 w-auto")
        job_address.setAttribute("type", "text")
        job_address.setAttribute("name", `job-address${times_pressed}`)
        // EXP START DATE
        // label for exp start date
        let label_start_exp = document.createElement("label")
        label_start_exp.innerHTML = "Start date"
        label_start_exp.setAttribute("class", "text-secondary")
        // input for exp start date
        let start_experience = document.createElement("input")
        start_experience.setAttribute("class", "form-control my-2 w-auto")
        start_experience.setAttribute("type", "month")
        start_experience.setAttribute("name", `start-exp${times_pressed}`)
        // EXP END DATE
        // label for exp end date
        let label_end_exp = document.createElement("label")
        label_end_exp.innerHTML = "End date"
        label_end_exp.setAttribute("class", "text-secondary")
        // input for exp end date
        let end_experience = document.createElement("input")
        end_experience.setAttribute("class", "form-control my-2 w-auto")
        end_experience.setAttribute("type", "month")
        end_experience.setAttribute("name", `end-exp${times_pressed}`)


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
        // exp_section.appendChild(new_div)

    }
    else {
        window.alert("Max. number of experiences: 5")
    }
    times_pressed++

})

// // send time_press to flask
// function send_times_pressed() {
//     const request = new XMLHttpRequest()
//     request.open("OPEN", `/${JSON.stringify(times_pressed)}`)
//     request.send()
// }