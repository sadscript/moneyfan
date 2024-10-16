// Function to search for a string in any anchor tag within the 3rd TD of each row,
// check SVG class, sum dollar values for passing entries, and display individual amounts
function searchTableRows(searchString = '') {
    const rows = document.querySelectorAll('tr');
    let totalPassValue = 0;
    let matchCount = 0;
    let passCount = 0;
    let groupTotals = {};
    
    rows.forEach((row, index) => {
        const secondTd = row.querySelector('td:nth-child(2)');
        const thirdTd = row.querySelector('td:nth-child(3)');
        
        if (thirdTd) {
            const anchors = thirdTd.querySelectorAll('a');
            const lastAnchor = anchors[anchors.length - 1];
            
            if (lastAnchor) {
                const anchorText = lastAnchor.textContent.trim();
                
                if (searchString === '' || anchorText.toLowerCase().includes(searchString.toLowerCase())) {
                    matchCount++;
                    const svg = thirdTd.querySelector('svg');
                    
                    if (svg) {
                        let status = 'Unknown';
                        let dollarValue = 0;
                        
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
                                groupTotals[anchorText] = (groupTotals[anchorText] || 0) + dollarValue;
                            }
                            if (searchString !== '') {
                                console.log(`%cMatch found in row ${index + 1}: ${status} - ${anchorText} - $${dollarValue.toFixed(2)}`, 'color: green; font-weight: bold;');
                            }
                        } else if (svg.classList.contains('m-danger')) {
                            status = 'Declined';
                            if (searchString !== '') {
                                console.log(`%cMatch found in row ${index + 1}: ${status} - ${anchorText} - $${dollarValue.toFixed(2)}`, 'color: red; font-weight: bold;');
                            }
                        } else if (searchString !== '') {
                            console.log(`Match found in row ${index + 1}: ${status} - ${anchorText} - $${dollarValue.toFixed(2)}`);
                        }
                    } else if (searchString !== '') {
                        console.log(`Match found in row ${index + 1}, but no SVG found: ${anchorText}`);
                    }
                }
            }
        }
    });
    
    if (searchString !== '') {
        console.log(`\nSummary:`);
        console.log(`Total matches found: ${matchCount}`);
        console.log(`Total passing entries: ${passCount}`);
        console.log(`Total value of passing entries: $${totalPassValue.toFixed(2)}`);
    } else {
        console.log(`\nTotals for each unique anchor text:`);
        Object.entries(groupTotals).forEach(([text, total]) => {
            console.log(`${text}: $${total.toFixed(2)}`);
        });
    }

    window.postMessage({ type: "FROM_PAGE", totalValue: totalPassValue.toFixed(2) }, "*");
}
