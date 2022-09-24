// FUNCTIONS

Array.prototype.contains = function (array) {
    return array.every(function (item) {
        return this.indexOf(item) !== -1;
    }, this);
}

// VARIABLES

const btns = document.querySelectorAll(".btn");
const btnClear = document.querySelector(".btnClear");
const filter = document.getElementById("filter");
const filterList = document.querySelector(".filterList");

// FILTERING ARRAY

let tagsArray = [];

// FUNCTIONALITY

// what happens when you click a filtering button 
btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        //open the window
        filter.classList.add("filter");
        filter.classList.remove("hide");

        // do not add if it is a duplicate
        for (child of filterList.children) {
            if (child.name == btn.textContent) {
                return;
            }
        };

        // add tags to the window
        let tag = document.createElement("div");
        tag.name = btn.textContent;
        tag.classList.add("tag");
        let tagName = document.createElement("p");
        tagName.classList.add("tagName");
        let close = document.createElement("button");
        close.classList.add("close");
        tagName.textContent = btn.textContent;
        filterList.append(tag);
        tag.append(tagName);
        tag.append(close);

        //remove tags
        close.addEventListener("click", (cls) => {
            cls.target.parentElement.remove();
            //close window if there are no filters
            if (filterList.children.length === 0) {
                filter.classList.remove("filter");
                filter.classList.add("hide");
            }
            //remove from array
            tagsArray = tagsArray.filter(e => e != btn.textContent);

            //remove from filtering
            let containers = document.querySelectorAll(".container");
            containers.forEach((container) => {
                let divsArray = [];
                let contBtns = container.querySelectorAll(".btn");
                contBtns.forEach((cbtn) => {
                    divsArray.push(cbtn.textContent);

                });
                if (divsArray.contains(tagsArray)) {
                    container.classList.remove("hide");
                }
            });
        });

        //create array with filters
        tagsArray.push(btn.textContent);

        //filter elements
        let containers = document.querySelectorAll(".container");
        containers.forEach((container) => {
            let divsArray =  [];
            let contBtns = container.querySelectorAll(".btn");
            contBtns.forEach((cbtn) => {
                divsArray.push(cbtn.textContent);
                
            });
            if (!divsArray.contains(tagsArray)) {
                container.classList.add("hide");
            }
        });
    });
});

//close window by clicking clear
btnClear.addEventListener("click", () => {
    //hide window
    filter.classList.remove("filter");
    filter.classList.add("hide");
    //remove filters
    let tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
        tag.remove();
    });
    tagsArray = [];

    //remove filtering
    let containers = document.querySelectorAll(".container");
    containers.forEach((container) => {
        let divsArray = [];
        let contBtns = container.querySelectorAll(".btn");
        contBtns.forEach((cbtn) => {
            divsArray.push(cbtn.textContent);

        });
        console.log(divsArray);
        if (divsArray.contains(tagsArray)) {
            container.classList.remove("hide");
        }
    });
})




