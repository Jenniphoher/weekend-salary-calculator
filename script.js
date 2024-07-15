
let body = document.querySelector('.body-image');
let tableBody = document.querySelector('#table-body');
let indicator = document.querySelector('#over-budget-indicator');
let footer = document.querySelector('footer');
let totalMonthlySalary = document.querySelector('#total-monthly-salary');
let totalSum = 0;
let idNumbersData = [];
let employeeData = [];

let firstName = document.querySelector('#fname-input');
let lastName = document.querySelector('#lname-input');
let idNumber = document.querySelector('#id-input');
let title = document.querySelector('#title-input');
let annualSalary = document.querySelector('#annualSalary-input');



// add employee function
function addEmployee(event) {
    event.preventDefault();

    function resetForm() {
        firstName.value = '';
        lastName.value = '';
        idNumber.value = '';
        title.value = '';
        annualSalary.value = '';
    }

    // New Employee row
    if (firstName.value === '') {
        resetForm();
        alert('Need to fill every box. If you don\'t know, ask HR.');
        return false;

    } else if (lastName.value === '') {
        resetForm();
        alert('Need to fill every box. If you don\'t know, ask HR.');
        return false;

    } else if (idNumber.value === '') {
        resetForm();
        alert('Need to fill every box. If you don\'t know, ask HR.');
        return false;

    } else if (title.value === '') {
        resetForm();
        alert('Need to fill every box. If you don\'t know, ask HR.');
        return false;

    } else if (annualSalary.value === '') {
        resetForm();
        alert('Need to fill every box. If you don\'t know, ask HR.');
        return false;

    } else {

        console.log('This is what\'s being logged in:', firstName.value, idNumber.valueAsNumber, annualSalary.valueAsNumber);
        let employee = {
            fName: firstName.value,
            lName: lastName.value,
            idNum: idNumber.valueAsNumber,
            titleName: title.value,
            annualNum: annualSalary.valueAsNumber
        }

        for(let id of idNumbersData) {
            if (idNumber.valueAsNumber === id) {
            resetForm();
            alert('Employee ID already exists.');
            return false;
            }
        }
        
        idNumbersData.push(idNumber.valueAsNumber);
        employeeData.push(employee);

        console.log('This is idNumbersData:', idNumbersData);

        tableBody.innerHTML += `
            <tr class="new-employee">

                <td>${firstName.value}</td>
                <td>${lastName.value}</td>
                <td>${idNumber.valueAsNumber}</td>
                <td>${title.value}</td>
                <td>${annualSalary.valueAsNumber}</td>

                <td>
                <button 
                onClick="deleteEmployee(event, ${idNumber.valueAsNumber})"
                >Delete</button>
                </td>

            <tr>`;
        
    }


    // Total Monthly 
    let monthlySalary = Math.round(annualSalary.valueAsNumber/12);
    console.log('This is monthlySalary:', monthlySalary);
    totalSum += monthlySalary;
    console.log('This is totalSum:', totalSum);

    totalMonthlySalary.innerHTML = 'Total Monthly: $'+totalSum;

    if (totalSum < 20000) {
        totalMonthlySalary.innerHTML = 'Total Monthly: $'+totalSum;
    
    } else if (totalSum === 20000) {
        indicator.innerHTML = `
        Budget was hit. Do not add any more employees.`;
    
    } else if (totalSum > 20000 && totalSum < 50000) {
        footer.classList.add('over-budget');
        totalMonthlySalary.innerHTML = 'Total Monthly: $'+totalSum;
        indicator.innerHTML = `
        <p style="color: red">
        Total monthly exceeded $20,000. Please delete employees.
        </p>`;
    
    } else if (totalSum >= 50000 && totalSum < 100000) {
        footer.classList.add('over-budget');
        totalMonthlySalary.innerHTML = 'Total Monthly: $'+totalSum;
        alert('COMPANY WILL SHUT DOWN. STOP.');
        
    } else if (totalSum >= 200000) {
        totalMonthlySalary.innerHTML = 'Total Monthly: $'+totalSum;
        body.innerHTML = '';
        body.classList.add('empty');
        body.innerHTML += `
    
        <main>
            <p class="uh-oh">
            Uh oh... the page you are looking for doesn't exist.
            </p>
    
            <span class="second-chance-para">
                <p class="second-chance-sentence">Maybe if you hadn't done what you weren't supposed to do,<br>
                The Company would still exist.<br>
                Here. Second chances are always welcomed at The Company.</p>
                <button id="second-chances" 
                class="second-chances" 
                onClick="secondChance()"><img class="time-turner" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aaeb67b0-b1c6-4918-a47f-2d0918a1c12a/d8caoy9-ec372d93-f26b-497f-82aa-8d2e06e76c14.png/v1/fill/w_1024,h_840/time_turner_flat_art_by_yaoinoyume_d8caoy9-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODQwIiwicGF0aCI6IlwvZlwvYWFlYjY3YjAtYjFjNi00OTE4LWE0N2YtMmQwOTE4YTFjMTJhXC9kOGNhb3k5LWVjMzcyZDkzLWYyNmItNDk3Zi04MmFhLThkMmUwNmU3NmMxNC5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Jg440SpOSCtNmv0VRz6DmV7B6uaNfjiLnbq5_eCadUs"></button> 
            </span>
        `
    }

    resetForm();
} // End of addEmployee FUNCTION



// delete funtion
function deleteEmployee(event, idNumOfEmployee) {

    for(let i=0; i<employeeData.length; i++) {
        if(idNumOfEmployee === employeeData[i].idNum) {

            monthlySalary = Math.round(employeeData[i].annualNum/12);
            console.log('This is monthlySalary before deleting:', monthlySalary);
            totalSum -= monthlySalary;
            console.log('This is totalSum before deleting:', totalSum);
        
            if (totalSum === 0 ) {
                console.log('This is totalSum = 0:', totalSum);
                document.querySelector('.over-budget').classList = '';
                totalMonthlySalary.innerHTML = 'Total Monthly';

            } else if (totalSum < 0) {
                console.log('This is totalSum < 0:', totalSum);
                document.querySelector('.over-budget').classList = '';
                document.querySelector('.p-budget').classList = '';
                totalMonthlySalary.innerHTML = 'Total Monthly';

            } else if (totalSum > 0 && totalSum < 20000) {
                console.log('This is totalSum > 0 && totalSum < 20000:', totalSum);
                document.querySelector('.over-budget').classList = '';
                indicator.innerHTML = '';
                totalMonthlySalary.innerHTML = 'Total Monthly: $'+totalSum;

            } else if (totalSum >= 20000) {
                totalMonthlySalary.innerHTML = 'Total Monthly: $'+totalSum;
            }

            let bye = employeeData.splice(i, 1);
            let idbye = idNumbersData.splice(i, 1);
            console.log('This is bye and idbye:', bye, idbye);
        }
    }

    event.target.parentElement.parentElement.remove();
}



// second chance function
function secondChance() {
    location.reload();
}