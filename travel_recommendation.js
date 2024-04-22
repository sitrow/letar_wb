const btnSearch = document.getElementById("btnSearch");
const btnReset = document.getElementById("btnReset");
const resultDiv = document.getElementById("searchResults");

function search() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    
    resultDiv.innerHTML = "";
    
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(key => {
                if(key.toLowerCase().includes(input)) {
                    if("beaches"===key || "temples"===key){
                        data[key].forEach(el => {
                            resultDiv.innerHTML += `<img src="${el.imageUrl}" width="300" alt="img">`;
                            resultDiv.innerHTML += `<p>${el.name}</p>`;
                            resultDiv.innerHTML += `<p>${el.description}</p><hr>`
                        })
                    } else {
                        let count = 1;
                        data[key].forEach(el => {                            
                            el["cities"].forEach(
                                city => {                                                                        
                                    resultDiv.innerHTML += `<img src="${city.imageUrl}" width="300" alt="img">`;
                                    resultDiv.innerHTML += `<p>${city.name}</p>`;
                                    resultDiv.innerHTML += `<p>${city.description}</p><hr>`
                                }
                            )
                        })
                    }
                }
            })
            
        });
    


}

function reset() {
    resultDiv.innerHTML = "";
}

btnReset.addEventListener('click', reset);
btnSearch.addEventListener('click', search);