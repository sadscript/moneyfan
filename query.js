// Function to search for a string in any anchor tag within the 3rd TD of each row,
// check SVG class, sum dollar values for passing entries, and display individual amounts
function searchTableRows(searchString) {
    // Get all table rows
    const rows = document.querySelectorAll('tr');
    let totalPassValue = 0;
    let matchCount = 0;
    let passCount = 0;
    
    rows.forEach((row, index) => {
        // Get the 2nd and 3rd TD in each row
        const secondTd = row.querySelector('td:nth-child(2)');
        const thirdTd = row.querySelector('td:nth-child(3)');
        
        if (thirdTd) {
            // Find all 'a' elements within the 3rd TD
            const anchors = thirdTd.querySelectorAll('a');
            
            // Check all anchor tags for the search string
            const matchingAnchor = Array.from(anchors).find(anchor => 
                anchor.textContent.includes(searchString)
            );
            
            if (matchingAnchor) {
                matchCount++;
                // Find SVG element
                const svg = thirdTd.querySelector('svg');
                
                if (svg) {
                    let status = 'Unknown';
                    let dollarValue = 0;
                    
                    // Extract dollar value from 2nd TD
                    if (secondTd) {
                        const strongTag = secondTd.querySelector('strong');
                        if (strongTag) {
                            dollarValue = parseFloat(strongTag.textContent.replace(/[^0-9.-]+/g, ""));
                        }
                    }
                    
                    if (svg.classList.contains('m-success')) {
                        status = 'Paid';
                        passCount++;
                        if (!isNaN(dollarValue)) {
                            totalPassValue += dollarValue;
                        }
                    } else if (svg.classList.contains('m-danger')) {
                        status = 'Declined';
                    }
                    
                    console.log(`Match found in row ${index + 1}: ${status} - ${matchingAnchor.textContent} - $${dollarValue.toFixed(2)}`);
                    // You can perform additional actions here, like highlighting the row
                } else {
                    console.log(`Match found in row ${index + 1}, but no SVG found: ${matchingAnchor.textContent}`);
                }
            }
        }
    });
    
    // Output summary
    console.log(`\nSummary:`);
    console.log(`Total matches found: ${matchCount}`);
    console.log(`Total passing entries: ${passCount}`);
    console.log(`Total value of passing entries: $${totalPassValue.toFixed(2)}`);
}