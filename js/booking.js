$(document).ready(function(){

    document.getElementById('Total').value = "";

    function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      }
      
      console.log(uuidv4());

    const form = document.getElementById("booking");
    const result = document.getElementById("result");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        result.innerHTML = "Please wait...";
      
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: json,
        })
          .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
              result.innerHTML = json.message;
              result.classList.remove("text-gray-500");
              result.classList.add("text-green-500");
            } else {
              console.log(response);
              result.innerHTML = json.message;
              result.classList.remove("text-gray-500");
              result.classList.add("text-red-500");
            }
          })
          .catch((error) => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
          })
          .then(function () {
            form.reset();
            setTimeout(() => {
              result.style.display = "none";
            }, 5000);
          });
      });

    var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
        removeItemButton: true,
        maxItemCount:20,
        searchResultLimit:20,
        renderChoiceLimit:20
    });


 



    function calculate() {
        var selectElement = document.getElementById('choices-multiple-remove-button');
        let totalInput = document.getElementById('Total');
        totalInput.value = "0";

        var timeStart = document.getElementById('book-start-time');
        var timeEnd = document.getElementById('book-end-time');
        var dateStart = document.getElementById('book-start-date');
        var dateEnd = document.getElementById('book-end-date');

        $(".services-input").on('change', function() {

            console.log("xxxxxxxxxxxxxxxxxxxxxxxx " + selectElement.childElementCount);
            let childArr = _.range(selectElement.childElementCount);

            const servicesChosen = document.querySelector('#chosen-services'); 
            let servicesPicked = selectElement;
           
            let totalArray = []
            let servicesArray = []
            for (let j = 0; j < childArr.length; j++) {
                
                const element = childArr[j];
                
                console.log("zzzzzzzzzzzzzzzzzzzzzzzz " + element + selectElement[element].value);
                console.log(parseInt(selectElement[element].value));
                let priceInterger = parseInt(selectElement[element].value)
                totalArray.push(priceInterger);

                let servicesChose = servicesPicked.childNodes[element].innerHTML
                console.log(servicesPicked.childNodes[element].innerHTML);
                servicesArray.push(servicesChose);

                
            }
            console.log(totalArray);
            console.log("£"+_.sum(totalArray)+".00");
            totalInput.value = _.sum(totalArray);

            console.log("start time:    " + parseInt(timeStart.value) - 24 + "\n" +
              "end time:    " + parseInt(timeEnd.value) - 24  + "\n" +
              "amount of days:    " + parseInt(dateStart.value) - parseInt(dateEnd.value)
            )
            


console.log(servicesArray);

let serviceArray = []
servicesArray.forEach(element => {
    let servicesStr = _.toString(element)
    let replaceComma = '<div class="px-1 pb-1"><div class="card text-bg-success rounded-0 p-2">' + servicesStr + '</div></div>'
    serviceArray.push(replaceComma);
});
let arrToString = _.toString(serviceArray)
let replString = arrToString.split(",").join(' ');
console.log(replString);
servicesChosen.innerHTML = replString;
                
    let element = document.getElementById("encrypt-button");
    let invalidCheck = document.getElementById("invalidCheck");

            if (totalInput.value == "0") {
                $(invalidCheck).prop("checked", false);
                element.classList.add("disabled");
            } else {
                invalidCheck.addEventListener('change', () => {
                    if (invalidCheck.checked && totalInput.value !== "0") {
                        element.classList.remove("disabled");
                        
                    }
                });
            }

            

        });
    }

    // Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

    function booking() {
        const element = (
    
            <div>
                <div id="booking-form"></div>
            </div>
    
        );
        ReactDOM.render(
            element,
            document.getElementById('booking_component')
        );
    }
    
    booking();
    calculate();

    

});
   


