var ENEXT = ENEXT || {};

ENEXT.cityValues = (function(){

  var selectModifier = '';

  var anchorTo = function(selector, modifier) {

    selectModifier = modifier;
    CreateCityTypeahead(selector);

  };

  //City typeahead creation
  var CreateCityTypeahead = function(selector) {
    var selected, originalVal, configCss;

    var data = new Bloodhound({
      datumTokenizer: function(datum) {
        return Bloodhound.tokenizers.whitespace(datum['city']);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: 'https://edunextpublic.s3-us-west-2.amazonaws.com/edxsites/politecnico/lms/static/js/all-cities.js'
    });

    data.clearPrefetchCache();
    data.initialize(true);

    $(selector).typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'Ubicaciones',
      displayKey: 'city',
      source: function(query, cb) {
        data.search(query, function(suggestions) {
          cb(filter(suggestions));
        });
      }
    });

    $(selector).on("typeahead:active", function(aEvent) {
      selected = null;
      originalVal = $(selector).typeahead("val");
    })

    $(selector).on("typeahead:select", function(aEvent, aSuggestion) {
      configCss = {"background-color":"#fff"}
      selected = aSuggestion;
      $(selector).css(configCss);
    });

    //Clear input if value isn't on the list
    $(selector).on("typeahead:change", function(aEvent, aSuggestion) {
      if (!selected) {
        configCss = {"background-color":"#f49191"}
       $(selector).typeahead("val", originalVal);
       $(selector).css(configCss);
      }
    });  
  };

  //this function is intended to filter suggestions according selected country
  var filter = function(suggestions) {
    var countryVal = $(selectModifier).val();

    if ( !countryVal ) {
      return suggestions;
    }

    var filteredSuggestions = [];
    filteredSuggestions = $.grep(suggestions, function(suggestion) {
      return suggestion.country == countryVal;
    });

    return filteredSuggestions;
  }

  var api = {
    anchorTo: anchorTo
  };

  function fixstyles (){
    var element = document.querySelector("#register-city");
    var xs = document.querySelector(".form-field.text-city label")
    console.log("hola1")
    function setDisplay() {
     if(!element.value== "")
       xs.classList.remove("focus-out")
       xs.classList.remove("focus-in")
       console.log("hola3")
      }
    
      
     setDisplay()
    
    const observer = new MutationObserver(() => {
     setDisplay();
     console.log("hola2")
    
    });
    // Opcions para el observer
    const observerOptions = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: false,
    attributeOldValue: false,
    characterDataOldValue: false
    };
    observer.observe(element, observerOptions);
    }; fixstyles()


  // *********************** Only for testing purposes ********************

  // api.__testing__ = {};
  // api.__testing__.add_element = add_element;

  // *********************** Only for testing purposes ********************

  return api;

})();