/* Author: 

*/

$(document).ready(function() {
    
    // Enable Popover Tips
    $('*[rel=popover]').each(function(idx, el) {
        var $el = $(el);
        
        // Attach Popover Help
        $el.popover({
            placement: 'right'
        });
        
        // Attach Hover Events
        $el.bind('mouseenter mouseleave', function(e) {
            if (e.type == 'mouseenter') {
                $(this).addClass('hover');
            } else {
                $(this).removeClass('hover');
            }
        });
    });
    
    // Enable HTML5 Forms    
    $('form').h5form({
        validation: {
            output: {
                inline: {type: 'none'},
                submit: {enabled: true},   //type: 'list', listContainerId: 'validationErrors'},
                iconToggle: h5form_toggleFieldIcon
            },
            classname: {
                valid:   '',
                invalid: 'error'
            }         
        },
        events: {
            //'onValid':   function(){ $('#cmdSubmitId').attr('disabled', null); },
            //'onInvalid': function(){ $('#cmdSubmitId').attr('disabled', 'disabled'); }
        }
    });

    // Attach functionality to Add New button
    var html = '<div id="testX{N}-container" class="clearfix field-container" rel="popover" data-content="testing" data-original-title="Testing!">'
             + '<label for="testX{N}Id">Numeric Input:</label>'
             + '<div class="input">'
             + '<input type="text" id="testX{N}Id" name="testX{N}" class="xlarge span8" value="" data-container="testX{N}-container" placeholder="Numbers only please..." data-pattern="^\\s*\\d+\\s*$" data-msg-pattern="testX{N} must be only numbers!" />'
             + '</div>'
             + '</div>';
    
    var testIdx = 0;
    $('#cmdAddNew').click(function() {
        $('#addNewSpot')
            .append(html.replace(/{N}/g, testIdx))
            .attr({'id': 'oldSpot' + testIdx})
            .after('<div id="addNewSpot" class="clearfix"></div>')
            .find('*[rel=popover]').popover({placement: 'right'}).end()
            .find('[name=testX' + testIdx + ']').focus();
        testIdx++;
    });
    
});





// Custom Method for Displaying Field Validity Icons
// "this" var refers to h5form object
function h5form_toggleFieldIcon(fieldEl, errorMsg, isValid) {
    var fieldData = this.getFieldData(fieldEl);

    // Check for Existing Field Icon
    var fieldIcon = fieldData.fieldIcon;
    if( !fieldIcon ) {
        // Create New Field Icon Element
        fieldIcon = $('<span/>').insertAfter(fieldEl);
        fieldIcon.addClass('help-block error-msg')
            .attr('title', this.options.validation.defaultErrorMessage.iconValid)
            .css({'display': 'block'});

        // Store Field Icon with Field
        this.setFieldData(fieldEl, {fieldIcon: fieldIcon});
    }

    // Update Field Icon State
    if( isValid !== false ) {
        fieldIcon.css({'display': 'none'});
    } else {
        errorMsg = errorMsg || this.options.validation.defaultErrorMessage.iconInvalid;
        fieldIcon.css({'display': 'block'})
            .html('<small><\/small>' + errorMsg)
            .attr('title', errorMsg);
    }
}
