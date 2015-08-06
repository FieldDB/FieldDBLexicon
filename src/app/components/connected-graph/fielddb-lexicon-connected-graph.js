'use strict';
/* globals FieldDB, Lexicon, iLanguageCloud */
angular.module('fielddbLexiconAngularApp').directive('fielddbLexiconConnectedGraph', function() {
  return {
    template: '<i ng-show="!corpus.glosser || corpus.glosser.fetching" class="fa fa-spinner fa-spin fa-5x"></i><section ng-show="corpus.prefs.showGlosserAsGraph" class="fielddb-glosser fielddb-lexicon"></section><i ng-show="!corpus.lexicon || corpus.lexicon.fetching" class="fa fa-spinner fa-spin fa-5x"></i><section ng-show="corpus.prefs.showLexiconAsList" class="fielddb-lexicon"></section>',
    restrict: 'A',
    // transclude: false,
    scope: {
      corpus: '=json'
    },
    link: function postLink(scope, element) {
      if (!scope.corpus || !scope.corpus.dbname) {
        return;
      }

      scope.maxLexiconSize = FieldDB.Lexicon.maxLexiconSize;
      // console.log("scopedata", scope.corpus);
      var glosser = new FieldDB.Glosser({
        dbname: scope.corpus.dbname
      });
      FieldDB.Lexicon.maxLexiconSize = 100;
      var lexicon = new FieldDB.Lexicon({
        // dbname: scope.corpus.dbname,
        // lexicalEntriesElement: element.find('section')[1],
        // dontConnectWordBoundaries: !scope.showWordBoundaries,
        localDOM: document
      });

      lexicon.fetch().then(function(entries) {
        if (!entries.length) {
          lexicon.popup("I downloaded your lexicon. Are you sure you have data in your " + scope.corpus.title + " corpus?");
          scope.corpus.lexicon = lexicon;
          scope.corpus.glosser = glosser;
          return;
        }
        // TODO use the lexicon precedence relations instead? lexicon.fetchConnectedGraph()
        glosser.fetch()
          .then(
            function(ngramSegmentations) {
              lexicon.entryRelations = ngramSegmentations;
              lexicon.updateConnectedGraph();

              // var wordCloud = new iLanguageCloud({
              //   orthography: 'please show me a word cloud please'
              // });
              // wordCloud.render();
              // wordCloud.lexicon = lexicon;
              // scope.corpus.wordCloud = wordCloud;
              // lexi.updateConnectedGraph();

              // lexicon
              // // .render({
              // //   lexicalEntriesElement: element.find('section')[1],
              // //   // igtFields: ["orthography", "utterance", "morphemes","gloss"]
              // // })
              // .visualizeAsForceDirectedGraph({
              //   element: document.getElementById("test-force-directed-graph") //element.find('section')[0]
              // });



              var old = function() {
                var divElement = document.getElementById("test-force-directed-graph"),
                  pouchname;


                var width = divElement.clientWidth,
                  height = 300;


                var tooltip;
                if (!lexicon.localDOM) {
                  try {
                    lexicon.localDOM = document;
                  } catch (e) {
                    // lexicon.warn("Lexicon will be unable to render a hover on the connected graph. If you intended to render it, you should provide an localDOM to the lexicon.");
                    lexicon.warn("Lexicon will be unable to render the connected graph. If you intended to render it, you should provide an localDOM to the lexicon.");
                    return lexicon;
                  }
                }
                tooltip = lexicon.localDOM.createElement("div");
                lexicon.localDOM.body.appendChild(tooltip);
                tooltip = d3.select(tooltip)
                  .style("position", "absolute")
                  .style("z-index", "10")
                  .style("visibility", "hidden")
                  .html("");


                var linkArc = function(d) {
                  var dx = d.source.x - d.target.x,
                    dy = d.source.y - d.target.y,
                    dr = Math.sqrt(dx * dx + dy * dy); //uncomment to curve the lines
                  // dr = 0;
                  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                };

                var transform = function(d) {
                  if (d.morphemes === "_#") {
                    d.x = width - 40;
                    d.y = height / 2;
                  }
                  if (d.morphemes === "#_") {
                    d.x = 40;
                    d.y = height / 2;
                  }
                  return "translate(" + d.x + "," + d.y + ")";
                };


                /*
                   Short morphemes will be blue, long will be red
                   */
                var color = d3.scale.linear()
                  .range(['darkblue', 'darkred']) // or use hex values
                  .domain([1, 8]);
                var lineColor = d3.scale.linear()
                  .range(['#FFFFF', '#FFFF00']) // or use hex values
                  .domain([1, 8]);

                var x = d3.scale.linear()
                  .range([0, width]);

                var y = d3.scale.linear()
                  .range([0, height - 40]);


                var colorByMorphemeLength = function(lexicalEntry) {
                  if (lexicalEntry.morphemes === "#_") {
                    return "#00000";
                  }
                  if (lexicalEntry.morphemes === "_#") {
                    return "#fffff";
                  }
                  if (!lexicalEntry.morphemes) {
                    console.log("this morpheme is empty ", lexicalEntry);
                    return "#ffffff";
                  }
                  return color(lexicalEntry.morphemes.length);
                  // return color(d.confidence * 10);
                };


                var force = d3.layout.force()
                  .nodes(lexicon.collection) // can be an object
                  .links(lexicon.connectedGraph.links)
                  .size([width, height])
                  .linkStrength(0.5)
                  .linkDistance(50)
                  .charge(-100);



                var svg = lexicon.localDOM.createElement("svg");
                if (typeof divElement.appendChild !== "function") {
                  lexicon.warn("You have provided a defective divElement, it is unable to append divElements to itself. Appending to the body of the document instead.", divElement);
                  // return lexicon;
                  lexicon.localDOM.body.appendChild(svg);
                } else {
                  divElement.appendChild(svg);
                }
                svg = d3.select(svg);

                var svg = d3.select(divElement).append("svg");

                svg.attr("width", width)
                  .attr("height", height);

                svg.append("defs").selectAll("marker")
                  .data(force.links())
                  // .data(["suit", "licensing", "resolved"])
                  .enter()
                  .append("marker")
                  .attr("id", function(d) {
                    return d;
                  })
                  .style("opacity", function() {
                    // return color(d.morphemes.length);
                    return 0.5;
                  })
                  .attr("viewBox", "0 -5 10 10")
                  .attr("refX", 15)
                  .attr("refY", -1.5)
                  .attr("markerWidth", 6)
                  .attr("markerHeight", 6)
                  .attr("orient", "auto")
                  .append("path")
                  .attr("d", "M0,-5L10,0L0,5");


                // var titletext = "Click to search morphemes in your corpus";

                // //A label for the current year.
                // var title = svg.append("text")
                //   .attr("class", "vis-title")
                //   .attr("dy", "1em")
                //   .attr("dx", "1em")
                //   .style("fill", "#cccccc")
                //   //    .attr("transform", "translate(" + x(1) + "," + y(1) + ")scale(-1,-1)")
                //   .text(titletext);


                //d3.json("./libs/rules.json", function(json) {


                // var path = svg.append("g").selectAll("path")
                //   .data(force.links())
                //   .enter().append("line")
                //   .attr("class", "link")
                //   .style("stroke", function(d) {
                //     return lineColor(d.value);
                //   })
                //   .style("stroke-width", function(d) {
                //     return d.value;
                //   });

                var path = svg.append("g").selectAll("path")
                  .data(force.links())
                  .enter().append("path")
                  .attr("class", function(d) {
                    var distance = d.distance || 1;
                    return "link " + d.relation + " distance" + distance;
                  })
                  .attr("marker-end", function(d) {
                    return "url(#" + d.relation + ")";
                  });

                // var circle = svg.append("g").selectAll("circle")
                //   .data(force.nodes())
                //   .enter().append("circle")
                //   .attr("class", "node")
                //   .attr("r", 5)
                //   .attr("data-details", function(d) {
                //     return d;
                //   })
                //   .style("fill", colorByMorphemeLength)
                //   .style("opacity", function(d) {
                //     // return color(d.morphemes.length);
                //     return d.confidence ? d.confidence / 2 : 1;
                //   })
                //   .on("mouseover", function(object) {
                //     var findNode;
                //     if (lexicon.localDOM) {
                //       findNode = lexicon.localDOM.getElementById(object.id);
                //     }
                //     if (findNode) {
                //       findNode = findNode.innerHTML + "<p>" + findNode.getAttribute("title") + "<p>";
                //     } else {
                //       findNode = "Morpheme: " + object.morphemes + "<br/> Gloss: " + object.gloss + "<br/> Confidence: " + object.confidence;
                //     }
                //     if (tooltip) {
                //       return;
                //     }
                //     return tooltip
                //       .style("visibility", "visible")
                //       .html("<div class='node_details_tooltip lexicon'>" + findNode + "</div>");
                //   })
                //   .on("mousemove", function() {
                //     /*global  event */
                //     if (tooltip) {
                //       return;
                //     }
                //     return tooltip.style("top", (event.pageY - 10) + "px")
                //       .style("left", (event.pageX + 10) + "px");
                //   })
                //   .on("mouseout", function() {
                //     if (tooltip) {
                //       return;
                //     }
                //     return tooltip
                //       .style("visibility", "hidden");
                //   })
                //   .on("click", function(d) {
                //     /* show the morpheme as a search result so the user can use the viz to explore the corpus*/
                //     if (lexicon.application && lexicon.application.router) {
                //       // lexicon.application.router.showEmbeddedSearch(dbname, "morphemes:"+d.morphemes);
                //       var url = "corpus/" + lexicon.corpus.dbname + "/search/" + "morphemes:" + d.morphemes;
                //       // window.location.replace(url);
                //       lexicon.application.router.navigate(url, {
                //         trigger: true
                //       });

                //     }
                //   })
                //   .call(force.drag);


                var circle = svg.append("g").selectAll("circle")
                  .data(force.nodes())
                  .enter().append("circle")
                  .attr("class", "node")
                  .attr("r", 5)
                  .style("fill", colorByMorphemeLength)
                  .style("opacity", function(d) {
                    // return color(d.morphemes.length);
                    return d.confidence ? d.confidence / 2 : 1;
                  })
                  .on("mouseover", function(object) {
                    var findNode;
                    if (lexicon.localDOM) {
                      findNode = lexicon.localDOM.getElementById(object.id);
                    }
                    if (findNode) {
                      findNode = findNode.innerHTML + "<p>" + findNode.getAttribute("title") + "<p>";
                    } else {
                      findNode = "Morpheme: " + object.morphemes + "<br/> Gloss: " + object.gloss + "<br/> Confidence: " + object.confidence;
                    }
                    if (tooltip) {
                      return;
                    }
                    return tooltip
                      .style("visibility", "visible")
                      .html("<div class='node_details_tooltip lexicon'>" + findNode + "</div>");
                  })
                  .on("mousemove", function() {
                    /*global  event */
                    if (tooltip) {
                      return;
                    }
                    return tooltip.style("top", (event.pageY - 10) + "px")
                      .style("left", (event.pageX + 10) + "px");
                  })
                  .on("mouseout", function() {
                    if (tooltip) {
                      return;
                    }
                    return tooltip
                      .style("visibility", "hidden");
                  })
                  .on("click", function(d) {
                    /* show the morpheme as a search result so the user can use the viz to explore the corpus*/
                    if (lexicon.application && lexicon.application.router) {
                      // lexicon.application.router.showEmbeddedSearch(dbname, "morphemes:"+d.morphemes);
                      var url = "/" + lexicon.application.currentCorpusDashboard + "/lexicon/" + d.headword;
                      // window.location.replace(url);
                      lexicon.application.router.navigate(url, {
                        trigger: true
                      });

                    }
                  })
                  .call(force.drag);
                // circle.append("title")
                //   .text(function(d) {
                //     return d.morphemes;
                //   });


                var text = svg.append("g").selectAll("text")
                  .data(force.nodes())
                  .enter().append("text")
                  .attr("x", 8)
                  .attr("y", ".31em")
                  .style("opacity", function(d) {
                    // return color(d.morphemes.length);
                    return d.confidence; //? d.confidence / 2 : 1;
                  })
                  .style("color", colorByMorphemeLength)
                  .text(function(d) {
                    return d.morphemes;
                  });


                // force.on("tick", function() {
                //   link.attr("x1", function(d) {
                //       return d.source.x;
                //     })
                //     .attr("y1", function(d) {
                //       return d.source.y;
                //     })
                //     .attr("x2", function(d) {
                //       return d.target.x;
                //     })
                //     .attr("y2", function(d) {
                //       return d.target.y;
                //     });

                //   node.attr("cx", function(d) {
                //       return d.x;
                //     })
                //     .attr("cy", function(d) {
                //       return d.y;
                //     });
                // });

                // Use elliptical arc path segments to doubly-encode directionality.
                var tick = function() {
                  path.attr("d", linkArc);
                  circle.attr("transform", transform);
                  text.attr("transform", transform);
                };

                try {
                  force
                    .on("tick", tick)
                    .start();
                } catch (e) {
                  if (e.message === "TypeError: Cannot read property 'weight' of undefined") {
                    lexicon.bug("Something is wrong with one of the links in the lexicon, it doesn't have a source or target. ", e.stack);
                  } else {
                    lexicon.warn("\nThe lexicon was able to start the connected graph. Something was wrong. ", e.stack);
                  }

                }

              };

              old();

              scope.corpus.lexicon = lexicon;
              scope.corpus.glosser = glosser;
              window.lexicon = lexicon;
              // rerenderIfWordBoundariesChange.push(scope.corpus.glosser.render);
            },
            function(error) {
              console.warn('There was a problem loading the glosser ' + error.stack);
              scope.corpus.bug('There was a problem loading the glosser ' + error.userFriendlyErrors);
            })
          .fail(function(exception) {
            scope.corpus.bug('There was a problem loading the glosser. Please report lexicon.');
            console.warn(exception.stack);
          });

      });
      // scope.corpus.glosser.render = function() {
      //   var glosserElement = element.find('section')[0];
      //   glosserElement.innerHTML = '';
      //   var confidenceRange = scope.corpus.prefs.lexiconConfidenceRange || {
      //     min: 0.5,
      //     max: 0.9
      //   };
      //   lexicon.visualizePrecedenceRelationsAsForceDirectedGraph(scope.corpus.lexicon, glosserElement, false, confidenceRange);
      // };


    }
  };
});
