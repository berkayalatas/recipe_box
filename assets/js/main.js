const searchForm = $('.form');
const searchBtn = $('.form .btn');
const searchResultDiv = $('.search-result');
const container = $('.card_container')

const APP_ID = '0c825dec';
const APP_KEY = 'fc92577c63c44bc8a240caa5f548b797';



searchForm.submit((e) => {

    e.preventDefault();

    searchValue = $('.form .form__field').val();
    //console.log(searchValue);
    getData();

    $('.form').children('input').val('')
    
})


searchBtn.click((e) => {

    e.preventDefault();

    searchValue = $('.form .form__field').val();
    //console.log(searchValue);

    getData();
    $('.form input').val('') //$('.form').children('input').val('')
  
})

async function getData() {

    const base_url = `https://api.edamam.com/search?q=${searchValue}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=21`;
    const response = await fetch(base_url);
    const data = await response.json(); //convert json;

    generateData(data.hits);

    console.log(data);
}


function generateData(results) {

    let generateHtml = '';

    results.map(result => {
        generateHtml += `

        <div class="recipe-card"  data-aos="fade-in">
          <aside>
            <img
              src="${result.recipe.image}"
              alt="Chai Oatmeal"
            />
            <a href="${result.recipe.url}" target="_blank" class="button"><span class="icon icon-play"></span></a>
          </aside>
    
          <article>
            <h2 class="title">${result.recipe.label}</h2>
    

            <ul>
			    <li><span class="icon icon-users"></span><span>1</span></li>
                <li><span class="icon icon-clock"></span><span>
                    ${result.recipe.totalTime > 0 ? result.recipe.totalTime: 'Unknown'}  
                    </span></li>
			    <li><span class="icon icon-calories"></span><span>${result.recipe.calories.toFixed()}</span></li>
		    </ul>


            <p class="ingredients">
                <span>Health Labels:&nbsp;</span> <br>
                ${result.recipe.healthLabels}
            </p>

            
            <p class="ingredients">
                <span>Total Weight:&nbsp;</span>${result.recipe.totalWeight.toFixed()}
            </p>

            
            <p class="item-data"> 
                <span>Cautions:&nbsp;</span>
                ${result.recipe.cautions == '' ?  'Healthy' : result.recipe.cautions }
            </p>


            <p class="item-data"> 
                 <span>Diet Labels:&nbsp;</span>
                 ${
                    result.recipe.dietLabels.length > 0
                      ? result.recipe.dietLabels
                      : "No Data"
                  }
             </p>
    
 
          </article>
        </div>
        `;
        $('.hide').hide();

        searchResultDiv.html(generateHtml);
    })
}