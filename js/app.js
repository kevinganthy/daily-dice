document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const memberInput = document.getElementById('member-name');
    const addButton = document.getElementById('add-member');
    const membersList = document.getElementById('members-list');
    const selectButton = document.getElementById('select-random');
    const resetButton = document.getElementById('reset-selection');
    const resultDisplay = document.getElementById('result');
    const historyList = document.getElementById('history-list');
    
    // State
    let members = [];
    let selectedMembers = [];
    
    // Load saved members from localStorage
    loadMembers();
    
    // Event listeners
    addButton.addEventListener('click', addMember);
    memberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addMember();
    });
    
    selectButton.addEventListener('click', selectRandomMember);
    resetButton.addEventListener('click', resetSelection);
    
    // Functions
    function loadMembers() {
        const savedMembers = localStorage.getItem('dailyDiceMembers');
        const savedHistory = localStorage.getItem('dailyDiceHistory');
        
        if (savedMembers) {
            members = JSON.parse(savedMembers);
            renderMembersList();
        }
        
        if (savedHistory) {
            selectedMembers = JSON.parse(savedHistory);
            renderHistory();
        }
    }
    
    function saveMembersToStorage() {
        localStorage.setItem('dailyDiceMembers', JSON.stringify(members));
    }
    
    function saveHistoryToStorage() {
        localStorage.setItem('dailyDiceHistory', JSON.stringify(selectedMembers));
    }
    
    function addMember() {
        const name = memberInput.value.trim();
        if (name && !members.includes(name)) {
            members.push(name);
            memberInput.value = '';
            renderMembersList();
            saveMembersToStorage();
        }
    }
    
    function removeMember(index) {
        members.splice(index, 1);
        renderMembersList();
        saveMembersToStorage();
    }
    
    function renderMembersList() {
        membersList.innerHTML = '';
        members.forEach((member, index) => {
            const li = document.createElement('li');
            li.textContent = member;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '✕';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => removeMember(index));
            
            li.appendChild(deleteBtn);
            membersList.appendChild(li);
        });
    }
    
    function selectRandomMember() {
        if (members.length === 0) {
            resultDisplay.textContent = 'Ajoutez des membres d\'abord';
            return;
        }
        
        // If all members have been selected, reset the selection
        if (selectedMembers.length >= members.length) {
            selectedMembers = [];
        }
        
        // Get available members (those who haven't been selected yet)
        const availableMembers = members.filter(member => !selectedMembers.includes(member));
        
        if (availableMembers.length === 0) {
            resultDisplay.textContent = 'Tous les membres ont été sélectionnés';
            return;
        }
        
        // Animation effect
        let counter = 0;
        const shuffleInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * members.length);
            resultDisplay.textContent = members[randomIndex];
            counter++;
            
            if (counter > 10) {
                clearInterval(shuffleInterval);
                
                // Select random from available members
                const finalRandomIndex = Math.floor(Math.random() * availableMembers.length);
                const selectedMember = availableMembers[finalRandomIndex];
                
                // Display result
                resultDisplay.textContent = selectedMember;
                resultDisplay.classList.add('highlight');
                setTimeout(() => {
                    resultDisplay.classList.remove('highlight');
                }, 1500);
                
                // Add to history
                selectedMembers.push(selectedMember);
                saveHistoryToStorage();
                renderHistory();
            }
        }, 100);
    }
    
    function resetSelection() {
        selectedMembers = [];
        resultDisplay.textContent = '';
        saveHistoryToStorage();
        renderHistory();
    }
    
    function renderHistory() {
        historyList.innerHTML = '';
        selectedMembers.forEach((member, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${member}`;
            historyList.appendChild(li);
        });
    }
});
