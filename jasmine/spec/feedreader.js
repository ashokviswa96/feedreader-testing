/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
      /* This is our first test suite - a test suite just contains
       * a related set of tests. This suite is all about the RSS
       * feeds definitions, the allFeeds variable in our application.
       */
      describe('RSS Feeds', function() {
        var feedLength=allFeeds.length;
        /* This tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(feedLength).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL', function() {
          for (var i = 0; i < feedLength; i++) {
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
          }
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', function() {
          for (var i = 0; i < feedLength; i++) {
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
          }
        });
      });


      /* Test suite named "The menu" */
      describe('The menu', function() {
        var x;
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
           x = $('body').hasClass('menu-hidden');
          expect(x).toBe(true);
        });

        /*Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when icon is clicked', function() {
          var menuIcon = $('.menu-icon-link');
          //to check if it shows when icon is clicked
          $('body').addClass('menu-hidden');
          menuIcon.trigger("click");
          x = $('body').hasClass('menu-hidden');
          expect(x).not.toBe(true);
          //checking if it hides when icon is clicked.
          $('body').removeClass('menu-hidden');
          menuIcon.trigger("click");
          var x = $('body').hasClass('menu-hidden');
          expect(x).toBe(true);
        });

      });
      /* test suite named "Initial Entries" */
      describe('Initial Entries', function() {
          /*
           *Test that ensures when the loadFeed
           * function is called and completes its work, there is at least
           * a single .entry element within the .feed container.
           * Remember, loadFeed() is asynchronous so this test will require
           * the use of Jasmine's beforeEach and asynchronous done() function.
           */
           beforeEach(function(done){
             loadFeed(0,function(){
               done();
             });
           });
           //dont use done if you are not calling a async function within your fnction
          it('consists atleast a entry element',function(){
           var elements=$(".feed .entry").length;
           expect(elements).not.toBe(0);
          });
        });

      describe('New Feed Selection', function() {
           var content,newcontent;
           //nested the loadfeeds to avoid dependency on previous test.
           beforeEach(function(done){
             loadFeed(1,function(){
               content=$(".entry").text();//store the current content
               loadFeed(0,function(){
                 newcontent=$(".entry").text();//store the new content
                 done();
               });
             });
           });
           it('content is changed when a new feed is loaded',function(){
             console.log(content,newcontent);
             expect(newcontent).not.toBe(content);
           });
      });
      }());
