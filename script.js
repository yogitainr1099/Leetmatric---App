document.addEventListener("DOMContentLoaded", function() {


    const searchButton = document.getElementById("search-btn");
    const userNameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLable = document.getElementById("easy-label");
    const mediumLable = document.getElementById("medium-label");
    const hardLable = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    // return true or false based on regex
    function validateUsername(userName) {
       if(userName.trim() === "") {
           alert("Username should not be empty");
           return false;
       }
       const regex = /^[a-zA-Z0-9_]{1,15}$/;
       const isMatching = regex.test(userName);
       if (!isMatching) {
           alert("Invalid Username");
       }
       return isMatching;
    }

   async function fetchUserDetails(userName) {

       const url = `https://leetcode-stats-api.herokuapp.com/${userName}`
       try{

           searchButton.textContent = "Searching....";
           searchButton.disabled = true;

           const response = await fetch(url);
           if(!response.ok) {
               throw new Error("Unable to fetch the user details");
           }
           const parsedData = await response.json();
           console.log("login data: ", parsedData);

           displayUserData(parsedData);
       }
       catch(error) {
           statsContainer.innerHTML = `<p>No data found</p>`
       }
       finally {
        searchButton.textContent = "Search";
        searchButton.disabled = false;
       }
        
   }

   function updateProgress(solved, total, label, circle) {
      const progressDegree = (solved/total)*100;
      circle.style.setProperty("--progress-degree", `${progressDegree}%` );
      label.textContent = `${solved}/${total}`;
   }


   function displayUserData(parsedData) {

      const totalQues = parsedData.totalQuestions;
       const totalEasyQues = parsedData.totalEasy;
       const totalMediumQues = parsedData.totalMedium;
       const totalHardQues = parsedData.totalHard;

  const solvedTotalQues = parsedData. totalSolved;
  const solvedEasyQues = parsedData. easySolved;
  const solvedMediumQues = parsedData. mediumSolved;
  const solvedHardQues = parsedData. hardSolved; 

   updateProgress(solvedEasyQues, totalEasyQues, easyLable, easyProgressCircle);
   updateProgress(solvedMediumQues, totalMediumQues, mediumLable, mediumProgressCircle);
   updateProgress(solvedHardQues, totalHardQues, hardLable, hardProgressCircle);


   const cardData = {
    
   }
    
}

    searchButton.addEventListener('click', function() {
        const userName = userNameInput.value;
        console.log("login username:", userName);
        if(validateUsername(userName)) {
            fetchUserDetails(userName);
        }
    } )


})
