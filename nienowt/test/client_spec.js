require('../build/bundle.js');
require('angular-mocks');

describe('human and ghost controllers', () => {
  var humanController;
  var ghostController;

  beforeEach(angular.mock.module('app'))
  beforeEach(angular.mock.inject(function($controller){
    humanController = $controller('HumanController');
    ghostController = $controller('GhostController');
  }))

  it('should construct a human controller', function(){
    expect(typeof humanController).toBe('object');
    expect(humanController.humans[0]).toBe('human')
    expect(typeof humanController.getHumans).toBe('function')
  })
  describe('Human REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
  }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })
    it('should get all humans', () => {
      $httpBackend.expectGET('http://localhost:3000/api/humans')
      .respond(200, [{name: 'TESTO'}])
      humanController.getHumans();
      $httpBackend.flush();
      expect(humanController.humans.length).toBe(1);
      expect(humanController.humans[0].name).toBe('TESTO')
    })
    it('should post a new human', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/humans', {name: 'testo2'})
      .respond(200, {name: 'testo2', _id:'15'});
      humanController.createHuman({name: 'testo2'});
      $httpBackend.flush();
      expect(humanController.humans.length).toBe(2);
      expect(humanController.humans[1].name).toBe('testo2')
    })
    it('should update human', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/humans/15', {name:'gwendo'})
      .respond(200, {name: 'gwendo', _id:15})
      humanController.editHuman({name:'gwendo'},{name: 'testo2', _id:15})
      $httpBackend.flush();
      expect(humanController.humans.length).toBe(2);
      expect(humanController.humans[1].name).toBe('gwendo')
    })
    it('should "remove" human', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/humans/15')
      .respond(200);
      humanController.removeHuman({name: 'testo2', _id:15});
      $httpBackend.flush();
      expect(humanController.humans.length).toBe(1)
      expect(humanController.humans.every((h) => h._id != 15)).toBe(true)
    })
    //ghosts
  })
  it('should construct a ghost controller', function(){
    expect(typeof ghostController).toBe('object');
    expect(ghostController.ghosts[0]).toBe('ghost')
    expect(typeof ghostController.getGhosts).toBe('function')
  })
  describe('Ghost REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
  }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })
    it('should get all ghosts', () => {
      $httpBackend.expectGET('http://localhost:3000/api/ghosts')
      .respond(200, [{name: 'TESTO'}])
      ghostController.getGhosts();
      $httpBackend.flush();
      expect(ghostController.ghosts.length).toBe(1);
      expect(ghostController.ghosts[0].name).toBe('TESTO')
    })
    it('should post a new ghost', () => {
      $httpBackend.expectPOST('http://localhost:3000/pub/new-ghost', {name: 'testo2'})
      .respond(200, {name: 'testo2', _id:'15'});
      ghostController.createGhost({name: 'testo2'});
      $httpBackend.flush();
      expect(ghostController.ghosts.length).toBe(2);
      expect(ghostController.ghosts[1].name).toBe('testo2')
    })
    it('should update ghost', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/ghosts/15', {ghost:{name:'gwendo'}})
      .respond(200, {name: 'gwendo', _id:15})
      ghostController.editGhost({ghost:{name:'gwendo'}},{name: 'testo2', _id:15})
      $httpBackend.flush();
      expect(ghostController.ghosts.length).toBe(2);
      expect(ghostController.ghosts[1].name).toBe('gwendo')
    })
    it('should "remove" ghost', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/ghosts/15')
      .respond(200);
      ghostController.removeGhost({name: 'testo2', _id:15});
      $httpBackend.flush();
      expect(ghostController.ghosts.length).toBe(1);
      expect(ghostController.ghosts.every((g) => g._id != 15)).toBe(true);
    })
  })
})
