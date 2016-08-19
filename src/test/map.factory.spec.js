describe('mapfactory', function () {
    var scope;
    var mocks = {};
    var mapfactory, $httpBackend;

    beforeEach(module('myApp'));


    beforeEach(inject(function($injectory){
      mapfactory = $injector.get('MapFactory');
      $httpBackend = $injector.get('$httpBackend');
    }))

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })

    it('uses Mocha, Chai, and Sinon', function() {
      var spy = sinon.spy();
      spy();
      expect(spy.called).to.be.ok;
    });


    it('should be registered', function() {
        expect(mapfactory).toBeDefined();
    });

    // it('gets a specific zip', function() {
    //   $httpBackend.expect('GET','api/...')
    //   mapfactory.get('');
    //   $httpBackend.flush();
    // })

    // describe('getZipData function', function () {
    //     it('should exist', function () {
    //         expect(mapfactory.getZipData).not.to.equal(null);
    //     });
    //
    //     it('should return array of location data', function (done) {
    //
    //         mapfactory.getAvengers(['10001']).then(function(data) {
    //             expect(data.length).to.equal(1);
    //             done();
    //         });
    //         $rootScope.$apply();
    //         $httpBackend.flush();
    //     });
    //
    //   });
    // describe('getZipOptions function', function () {
    //     it('should exist', function () {
    //         expect(mapfactory.getZipOptions).not.to.equal(null);
    //     });
    //
    //     it('should return all zip codes in NYC', function (done) {
    //         mapfactory.getZipOptions().then(function(count) {
    //             expect(count).to.equal(336);
    //             done();
    //         });
    //         $rootScope.$apply();
    //     });
    //
    //
    //     it('should contain New York County', function (done) {
    //         mapfactory.getZipOptions()
    //             .then(function(data) {
    //                 let hasNYC = data.some((element) => element.county === 'New York County');
    //                 expect(hasNYC).to.be.true;
    //                 done();
    //             });
    //         $rootScope.$apply();
    //       });
    //     });
    //
    //
    // specHelper.verifyNoOutstandingHttpRequests();

});
