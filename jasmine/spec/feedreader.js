/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against RSS FeedReader Application application.
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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.Also checks if the characters in URL is less than 10
         */
         it('URL is defined and is not empty and valid',function() {
           allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url.length).not.toBeLessThan(10);
           });
         });

        /* This test test that loops through each feed in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Name is defined and is not empty',function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* test suite named "The menu" This suite is all about the side menu in our application*/
    describe('The menu',function() {
         /*This test ensures that the menu element is
         * hidden by default. 
         */ 
        it('menu is hidden by default',function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

          /* This test  ensures the menu changes visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes is visibility on click',function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* Test suite named "Initial Entries" This suite is all about the entries loaded
    by  Google Feed Reader API by calling asynchronous function loadFeed()*/
    describe('Initial Entries',function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done) {
            loadFeed(0,done);
         });

         it('There should be atleast one feed',function() {
            expect($('.feed .entry-link').length).not.toBe(0);
         });
    });


    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection',function() {
        var old;
        beforeEach(function(done) {
            loadFeed(0,done);
             old = $('.entry')[0].innerText;
            loadFeed(1,done);
        });

         /* This test ensures that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */
        it('The content changes when new feed is loaded',function() {
            expect($('.entry').innerText).not.toBe(old);
        });
    });
       
}());
