describe('mapfactory', function () {
    var scope;
    var mocks = {};

    beforeEach(function () {
        module('app', function($provide) {
            specHelper.fakeLogger($provide);
        });
        specHelper.injector(function($rootScope, mapfactory) {});

        mocks.maaData = [{
            data: {results: mockData.getZipData()}
        }];

    });

    it('should be registered', function() {
        expect(mapfactory).not.to.equal(null);
    });

    describe('getZipData function', function () {
        it('should exist', function () {
            expect(mapfactory.getZipData).not.to.equal(null);
        });

        it('should return array of location data', function (done) {

            mapfactory.getAvengers(['10001']).then(function(data) {
                expect(data.length).to.equal(1);
                done();
            });
            $rootScope.$apply();
            $httpBackend.flush();
        });

});
    describe('getZipOptions function', function () {
        it('should exist', function () {
            expect(mapfactory.getZipOptions).not.to.equal(null);
        });

        it('should return all zip codes in NYC', function (done) {
            mapfactory.getZipOptions().then(function(count) {
                expect(count).to.equal(336);
                done();
            });
            $rootScope.$apply();
        });


        it('should contain New York County', function (done) {
            mapfactory.getZipOptions()
                .then(function(data) {
                    let hasNYC = data.some((element) => element.county === 'New York County');
                    expect(hasNYC).to.be.true;
                    done();
                });
            $rootScope.$apply();
          });
        });


    specHelper.verifyNoOutstandingHttpRequests();

});
