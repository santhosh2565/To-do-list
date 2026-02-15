
// function runs when the Add button is clicked
function addtask() {
    const input = document.getElementById("input")
    if (input.value != "") {
        // Get the input text

        // Create a new list item
        let li = document.createElement("li");
        document.getElementById("task-list").appendChild(li);
        li.textContent = input.value;

        // Create A complete Badge
        let badge = document.createElement("span");
        badge.classList.add('badge');
        badge.textContent = "Completed";
        li.appendChild(badge);

        // clear input value auto
        input.value = "";
        
        //completed list
        li.addEventListener("click", function(){
            li.classList.toggle("completed");
            if (li.classList.contains("completed")){
                badge.style.display = "inline-block";
            }
            else{
                badge.style.display = "none";
            }
        });
        
        // Create A delete button
        let clear = document.createElement("button");
        clear.classList.add('clear')
        clear.textContent = "Clear";
        li.appendChild(clear);

        clear.addEventListener("click",function(e){
            li.remove();
        });
    }
    else {
        alert("Please enter a task...!");
    }
}
