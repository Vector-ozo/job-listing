
const listItems = () => {
    fetch('../data.json')
    .then(res => {
        return res.json();
    })
    .then(datas => {
        // console.log(data.length);
        let container = document.querySelector('.container');

// ForEach Item inside the json file; 
        datas.forEach(data => {
            // console.log(data);
            let listRow = document.createElement('div');
            listRow.innerHTML = `
            <!-- List Flex 1 -->
            <div class="flex-1">
                <img src=" ${data.logo} " alt="" class="image">
                
                <!-- Inner Flex -->
                <div class="flex-1-1">
                
                <!-- first inner flex -->
                <div class="flex-1-1-1">
                    <span class="company"> ${data.company} </span>
                    <span class="new">new!</span>
                    <span class="featured">Featured</span>
                </div>
                
                <!-- second inner flex -->
                <div class="job-title">${data.position}</div>
                
                <!-- third inner flex -->
                <div class="flex-1-1-3">
                    <span class="date-posted">${data.postedAt}</span>
                    <span>.</span>
                    <span class="work-time">${data.contract}</span>
                    <span>.</span>
                    <span class="location">${data.location}</span>
                </div>
                </div>
                
            </div>
            
            <!-- List Flex 2 -->
            <div class="flex-2">
    
                <!-- Role -->
                <span>${data.role}</span>
    
                <!-- Level -->
                <span>${data.level}</span>
                
                <!-- Languages -->
                <span>${data.languages[0]}</span>
                <span>${data.languages[1]}</span>
                <span>${data.languages[2]}</span>
                <span>${data.tools[0]}</span>
                <span>${data.tools[1]}</span>
            </div>   
            `

            let skills = listRow.querySelectorAll('.flex-2 span');
            skills.forEach(skill => {
                skill.addEventListener('click', () => {
                    skill.classList.add('filtered');
                })
            })
            
            listRow.classList.add('list');
            container.appendChild(listRow);

            let ned = listRow.querySelector('.new');
            let fed = listRow.querySelector('.featured');

            // ======== New ========
            if(data.new == false){
                ned.style.display = "none";
            } else if(data.new == true){
                ned.style.display = "block";
            }

            // ========= Featured =========
            if(data.featured == false){
                fed.style.display = "none";
            } else if(data.featured == true){
                fed.style.display = "block";
            }
            
        });
        
        let langs = document.querySelectorAll('.flex-2 span');
        langs.forEach(lang => {
            // console.log(lang.innerText);
            if(lang.innerText == "undefined"){
                lang.style.display = "none";
            }
        })
        
        filterAll();
    })
    .catch(err => {
        // console.log(err);
    })

}

// Working on the Search/Filter section

const filterAll = () => {
    let filterItems = document.querySelector('.filter-items');
    let skills = document.querySelectorAll('.flex-2 span');

    //  Adding Filter Blocks. 
    skills.forEach(skill => {
        skill.addEventListener('click', () => {
            // looping through all skill blocks so that if they exist already return.
            for(let i = 0; i < filterItems.children.length; i++){
                if(filterItems.children[i].innerText == skill.innerText){
                    return;
                } 
                // console.log(filterItems.children[i].innerText);
            }
            // console.log(skill.innerText);

            let skillContent = skill.innerText;

            let block = document.createElement('div');
            block.classList.add('filter-blocks');

            block.innerHTML = `
                <span>${skillContent}</span>
                <img src="./images/icon-remove.svg" alt="" class="remove">
            `
            // console.log(block, skill);
            filterItems.appendChild(block);
            removeFilter();
            removeBlocks();

            
            removeEachBlocks(block);
        })
    })

    removeBlocks();
}


// Removing each block
let removeEachBlocks = (block) => {
    let remove = block.querySelectorAll('.remove');
    remove.forEach(rev => {
        rev.addEventListener('click', () => {
            // console.log(rev);
            rev.parentElement.remove();
            removeFilter();
        })

    })
}

// Removing all the blocks
let removeBlocks = () => {
    let remove = document.querySelectorAll('.remove');
    let clear = document.querySelector('.clear');
    clear.addEventListener('click', () => {
        for(let i = 0; i < remove.length; i++){
            remove[i].parentElement.remove();
            // console.log(remove[i]);
            removeFilter();
        }
    })
}

// Removing filter whenever there are no filter blocks present.
const removeFilter = () => {
    let filterItems = document.querySelector('.filter-items');
    let filter = document.querySelector('.filter');
    if(filterItems.children.length !== 0){
        filter.style.opacity = 1;
    } else {
        filter.style.opacity = 0;
    }
}


// When doc loads, i want the page to display these job listings. So,
window.addEventListener("load", listItems);
window.addEventListener("load", removeFilter);


// let scroller = () => {
//     let filter = document.querySelector('.filter');
//     if(this.scrollY >= 25){
//         filter.classList.add('scroll');
//     }else {
//         filter.classList.remove('scroll');
//     }
// }

// window.addEventListener("scroll", scroller)

