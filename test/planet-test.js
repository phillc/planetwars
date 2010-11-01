var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var Planet = require('../Planet').Planet,
    players = require('../Players');

vows.describe('Planet').addBatch({
    'getShips' : {
        'should return the number of ships' : function() {
            var planet = Planet({ships : 5});
            assert.equal(planet.getShips(), 5);
        }
    },
    'getOwner' : {
        'should return the owner' : function() {
            var planet = Planet({owner : 4});
            assert.equal(planet.getOwner(), 4);
        }
    },
    'getId' : {
        'should return the id' : function() {
            var planet = Planet({id : 13});
            assert.equal(planet.getId(), 13);
        }
    },
    'distanceFrom' : {
        'should return euclidean distance for planet at (14.2884238258,0.622568806433) to planet at (23.6079911509,11.6215535875)' : function() {
            var planet1 = Planet({ x : 14.2884238258, y : 0.622568806433 });
            var planet2 = Planet({ x: 23.6079911509, y : 11.6215535875});
            assert.equal(planet1.distanceFrom(planet2), 15);
        }
    },
    'isOwnedBy' : {
        'should return true if the planet is owned by me and I give it me' : function() {
            assert.isTrue(Planet({owner : players.me}).isOwnedBy(players.me));
        },
        'should return false if the planet is owned by me and I give it the opponent' : function() {
            assert.isFalse(Planet({owner : players.me}).isOwnedBy(players.opponent));
        },
        'should return false if the planet is neutral and I give it me' : function() {
            assert.isFalse(Planet({owner : players.neutral}).isOwnedBy(players.me));
        },
        'should return true if the planet is owned by the opponent and I give it the opponent' : function() {
            assert.isTrue(Planet({owner : players.opponent}).isOwnedBy(players.opponent));
        },
    },
    'isNeutral' : {
        'should return true if the planet is owned by the neutral player' : function() {
            assert.isTrue(Planet({owner : players.neutral}).isNeutral());
        },
        'should return false if the planet is owned by me' : function() {
            assert.isFalse(Planet({owner : players.me}).isNeutral());
        }
    },
    'addIncomingForce' : {
        'should add a force if it is for a planet of the same player' : function() {
            var planet = Planet({owner : players.enemy});
            planet.addIncomingForce(players.enemy, 50, 5);
            assert.equal(planet.getIncomingForces(players.enemy, 5), 50);
        },
        'should add a force if it is for a planet of the opposing player' : function() {
            var planet = Planet({owner : players.enemy});
            planet.addIncomingForce(players.me, 50, 5);
            assert.equal(planet.getIncomingForces(players.me, 5), 50);
        },
        'should add a force for all players' : function() {
            var planet = Planet({owner : players.opponent});
            planet.addIncomingForce(players.me, 45, 5);
            planet.addIncomingForce(players.opponent, 45, 5);
            assert.equal(planet.getIncomingForces(players.me, 5), 45);
            assert.equal(planet.getIncomingForces(players.opponent, 5), 45);
        },
        'should add several forces for the same player' : function() {
            var planet = Planet({owner : players.enemy})
            planet.addIncomingForce(players.me, 100, 5);
            planet.addIncomingForce(players.me, 100, 5);
            planet.addIncomingForce(players.me, 400, 3);
            assert.equal(planet.getIncomingForces(players.me, 5), 200);
            assert.equal(planet.getIncomingForces(players.me, 3), 400);
            assert.equal(planet.getIncomingForces(players.opponent, 5), 0);
            assert.equal(planet.getIncomingForces(players.opponent, 3), 0);
            assert.equal(planet.getIncomingForces(players.opponent, 2), 0);
        }
    },
    'shipBalance' : {
        'when the growth rate is 4 and 16 ships are already there,' : {
            'and there are no incoming ships' : {
                'should be the number of ships' : function() {
                    var planet = Planet({ owner : players.me,
                                          ships : 16,
                                          growth : 4 });
                    assert.equal(planet.shipBalance(), 16);
                },
            },
            'and there are an insignificant amount coming in the future' : {
                'should be the number of ships' : function() {
                    var planet = Planet({ owner : players.me,
                                          ships : 16,
                                          growth : 4 });
                    planet.addIncomingForce(players.opponent, 2, 5)
                    assert.equal(planet.shipBalance(), 16);
                }
            },
            'and there is an enemy force coming that can be countered just by growth' : {
                'should be the number of ships' : function() {
                    var planet = Planet({ owner : players.me,
                                          ships : 10,
                                          growth : 5 });
                    planet.addIncomingForce(players.opponent, 15, 4)
                    assert.equal(planet.shipBalance(), 10);
                }
            },
            'and there are 20 enemy ships 3 turns away' : {
                'should be the number of ships + (turns away * growth) - enemy ships' : function() {
                    var planet = Planet({ owner : players.me,
                                          ships : 16,
                                          growth : 4 });
                    planet.addIncomingForce(players.opponent, 20, 3);
                    assert.equal(planet.shipBalance(), 8);
                },
                'and there are 5 friendly ships 3 turns away' : {
                    'should be the number of ships + (turns away * growth) - enemy ships + friendly ships' : function() {
                        var planet = Planet({ owner : players.me,
                                              ships : 16,
                                              growth : 4 });
                        planet.addIncomingForce(players.opponent, 20, 3);
                        planet.addIncomingForce(players.me, 5, 3);
                        assert.equal(planet.shipBalance(), 13);
                    }
                }
            },
            'and it will be taken by the enemy' : function() {
                var planet = Planet({ owner : players.opponent,
                                      ships : 16,
                                      growth : 4 });
                planet.addIncomingForce(players.me, 100, 1);
                assert.equal(planet.shipBalance(), -80);
            }
        },
        'when an enemy fleet would set my planet to 0 ships, and another enemy fleet is incoming later' : {
            'should take into account the zero boundary' : function() {
                var planet = Planet({ owner : players.me,
                                      ships : 10,
                                      growth : 5 });
                planet.addIncomingForce(players.opponent, 25, 3);
                planet.addIncomingForce(players.opponent, 5, 5);
                assert.equal(planet.shipBalance(), 0);
            }
        }
    },
    'farthestForce' : {
        'should use the farthest friendly force' : function() {
            var planet = Planet({ owner : players.me });
            planet.addIncomingForce(players.me, 1, 3);
            planet.addIncomingForce(players.me, 1, 10);
            planet.addIncomingForce(players.me, 1, 4);
            assert.equal(planet.farthestForce(), 10)
        },
        'should use the farthest enemy force' : function() {
            var planet = Planet({ owner : players.opponent });
            planet.addIncomingForce(players.me, 1, 10);
            planet.addIncomingForce(players.me, 1, 11);
            planet.addIncomingForce(players.me, 1, 9);
            assert.equal(planet.farthestForce(), 11)
        },
        'should use the farthest of the friendly or enemy force' : function() {
            var planet = Planet({ owner : players.me });
            planet.addIncomingForce(players.me, 1, 3);
            planet.addIncomingForce(players.opponent, 1, 3);
            planet.addIncomingForce(players.me, 1, 10);
            planet.addIncomingForce(players.opponent, 1, 17);
            planet.addIncomingForce(players.me, 1, 4);
            assert.equal(planet.farthestForce(), 17)
        }
    },
    'futureState' : {
        'when the growth rate is 3 and 2 ships are already there,' : {
            'and it is mine' : {
                topic: function(){
                    return Planet({ owner : players.me,
                                    ships : 2,
                                    growth : 3 });
                },
                'in 3 turns should be the number of ships + turns * growth rate' : function(planet) {
                    assert.equal(planet.futureState(3).owner, players.me);
                    assert.equal(planet.futureState(3).ships, 11);
                }
            },
            'and it is the enemys' : {
                topic: function(){
                    return Planet({ owner : players.opponent,
                                    ships : 2,
                                    growth : 3 });
                },
                'in 3 turns should be the number of ships + turns * growth rate' : function(planet) {
                    assert.equal(planet.futureState(3).owner, players.opponent);
                    assert.equal(planet.futureState(3).ships, 11);
                }
            },
            'and it is neutral' : {
                topic: function(){
                    return Planet({ owner : players.neutral,
                                    ships : 2,
                                    growth : 3 });
                },
                'in 3 turns should be the number of ships' : function(planet) {
                    assert.equal(planet.futureState(3).owner, players.neutral);
                    assert.equal(planet.futureState(3).ships, 2);
                }
            }
        },
    },
    'isSamePlanet' : {
        'should be true when given the same planet' : function() {
            var planet = new Planet({ id : 2 });
        
            assert.isTrue(planet.isSamePlanet(planet));
        },
        'should be false when given a different planet' : function() {
            var planet1 = new Planet({ id : 1 });
            var planet2 = new Planet({ id : 2 });
            assert.isFalse(planet1.isSamePlanet(planet2));
        }
    }
}).export(module);
