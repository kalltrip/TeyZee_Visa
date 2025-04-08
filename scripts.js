// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', function () {
    const destinationCards = document.querySelectorAll('.destination-card'); // All the destination cards
    const loadMoreButton = document.getElementById('loadMoreBtn'); // The "Load More" button
    const cardsPerLoad = 3; // How many cards to show initially and per click

    // Initially hide all cards except for the first 3
    function updateCards() {
        destinationCards.forEach((card, index) => {
            if (index < cardsPerLoad) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Show the load more button only if there are more than the visible cards
        if (destinationCards.length > cardsPerLoad) {
            loadMoreButton.style.display = 'inline-block'; // Show the "Load More" button
        } else {
            loadMoreButton.style.display = 'none'; // Hide the button if there are no more cards to load
        }
    }

    // Load more cards when the button is clicked
    loadMoreButton.addEventListener('click', function () {
        const visibleCards = document.querySelectorAll('.destination-card[style*="display: block"]'); // Cards that are currently visible
        const startIndex = visibleCards.length; // Where to start loading the next cards

        // Show the next set of cards
        for (let i = startIndex; i < startIndex + cardsPerLoad && i < destinationCards.length; i++) {
            destinationCards[i].style.display = 'block';
        }

        // If all cards are loaded, hide the "Load More" button
        if (startIndex + cardsPerLoad >= destinationCards.length) {
            loadMoreButton.style.display = 'none';
        }
    });

    // Initial setup: Hide cards and show only the first 3
    updateCards();
});
// document.addEventListener("DOMContentLoaded", function() {
//     document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
//         toggle.addEventListener("click", function() {
//             let content = this.nextElementSibling;
            
//             // Toggle active class
//             this.classList.toggle("active");

//             // Smooth dropdown effect
//             if (content.style.maxHeight) {
//                 content.style.maxHeight = null;
//             } else {
//                 content.style.maxHeight = content.scrollHeight + "px";
//             }
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", function() {
    // Define the cascading dropdown options
    const categoriesData = {
        "Business": ["Meeting", "Conference", "Trade Show", "Investment"],
        "Tourist": ["Employed", "Self-Employed", "Sponsored"],
        "Other": ["Student", "Work", "Seaman"]
    };

    // Get DOM elements
    const primaryDropdown = document.getElementById("primary-category");
    const subCategoryContainer = document.getElementById("subcategory-container");
    const subCategoryDropdown = document.getElementById("sub-category");
    const checklistSelectors = document.querySelectorAll(".checklist-selector");
    const checklistSections = document.querySelectorAll(".checklist-section");

    // Primary category change handler
    primaryDropdown.addEventListener("change", function() {
        const selectedCategory = this.value;
        
        // Clear sub-category dropdown
        subCategoryDropdown.innerHTML = '<option value="">-- Select Sub-Category --</option>';
        
        // Hide all selectors first
        checklistSelectors.forEach(selector => {
            selector.style.display = "none";
        });
        
        if (selectedCategory) {
            // Populate sub-categories
            if (categoriesData[selectedCategory]) {
                categoriesData[selectedCategory].forEach(subCat => {
                    const option = document.createElement("option");
                    option.value = subCat;
                    option.textContent = subCat;
                    subCategoryDropdown.appendChild(option);
                });
                
                // Show sub-category dropdown
                subCategoryContainer.style.display = "block";
                
                // Show only selectors for the selected primary category
                // checklistSelectors.forEach(selector => {
                //     if (selector.getAttribute("data-category") === selectedCategory) {
                //         selector.style.display = "block";
                //     }
                // });
            } else {
                subCategoryContainer.style.display = "none";
            }
        } else {
            // Hide sub-category dropdown if no primary category is selected
            subCategoryContainer.style.display = "none";
        }
        
        // Hide all sections
        checklistSections.forEach(section => {
            section.style.display = "none";
        });
        
        // Reset active selector styling
        checklistSelectors.forEach(s => {
            s.classList.remove("active-selector");
        });
    });

    // Sub-category change handler
    subCategoryDropdown.addEventListener("change", function() {
        const selectedCategory = primaryDropdown.value;
        const selectedSubCategory = this.value;
        
        // Hide all sections
        checklistSections.forEach(section => {
            section.style.display = "none";
        });
        
        // Reset active selector styling
        checklistSelectors.forEach(s => {
            s.classList.remove("active-selector");
        });
        
        if (selectedCategory && selectedSubCategory) {
            // Find matching selector and activate it
            checklistSelectors.forEach((selector, index) => {
                const selectorCategory = selector.getAttribute("data-category");
                const selectorSubcategory = selector.getAttribute("data-subcategory");
                
                if (selectorCategory === selectedCategory && selectorSubcategory === selectedSubCategory) {
                    // Show matching section
                    if (checklistSections[index]) {
                        checklistSections[index].style.display = "flex";
                    }
                    
                    // Update active selector styling
                    selector.classList.add("active-selector");
                }
            });
        }
    });

    // Selector click handler
    checklistSelectors.forEach((selector, index) => {
        selector.addEventListener("click", function() {
            // Hide all sections
            checklistSections.forEach(section => {
                section.style.display = "none";
            });
            
            // Show selected section
            if (checklistSections[index]) {
                checklistSections[index].style.display = "flex";
            }
            
            // Update active selector styling
            checklistSelectors.forEach(s => {
                s.classList.remove("active-selector");
            });
            this.classList.add("active-selector");
            
            // Update dropdowns to match selected section
            const category = this.getAttribute("data-category");
            const subcategory = this.getAttribute("data-subcategory");
            
            if (category) {
                primaryDropdown.value = category;
                
                // Trigger change event to update sub-categories
                const event = new Event("change");
                primaryDropdown.dispatchEvent(event);
                
                // Set sub-category if available
                if (subcategory) {
                    setTimeout(() => {
                        subCategoryDropdown.value = subcategory;
                    }, 10);
                }
            }
        });
    });

    // Initialize the first primary option
    primaryDropdown.selectedIndex = 0;
    const initEvent = new Event("change");
    primaryDropdown.dispatchEvent(initEvent);
});
document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', function() {
        // Remove selected class from all time slots
        document.querySelectorAll('.time-slot').forEach(s => {
            s.classList.remove('selected');
        });
        
        // Add selected class to clicked time slot
        this.classList.add('selected');
    });
});