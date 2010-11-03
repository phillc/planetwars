var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var Planet = require('../Planet').Planet,
    players = require('../players');

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
        },
        'should return 0 if given the same planet' : function() {
            var planet = Planet({ x : 14.2884238258, y : 0.622568806433 });
            assert.equal(planet.distanceFrom(planet), 0);
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
        'return 0 if nothing incoming' : function() {
            var planet = Planet({ owner : players.me });
            assert.equal(planet.farthestForce(), 0)
        },
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
            var planet = Planet({ id : 2 });
        
            assert.isTrue(planet.isSamePlanet(planet));
        },
        'should be false when given a different planet' : function() {
            var planet1 = Planet({ id : 1 });
            var planet2 = Planet({ id : 2 });
            assert.isFalse(planet1.isSamePlanet(planet2));
        }
    },
    'effectiveDefensiveValue' : {
        'in the perspective of me' : {
            'when there would be zero ships on it' : {
                'and it is mine' : function() {
                    var planet = Planet({ owner : players.me,
                                          ships : 0,
                                          growth : 3 });
                    assert.equal(planet.effectiveDefensiveValue(players.me, 0), 0)
                },
                'and it is neutral' : function() {
                    var planet = Planet({ owner : players.neutral,
                                          ships : 0,
                                          growth : 3 });
                    assert.equal(planet.effectiveDefensiveValue(players.me, 0), -1)
                },
                'and it it the enemys' : function() {
                    var planet = Planet({ owner : players.opponent,
                                          ships : 0,
                                          growth : 3 });
                    assert.equal(planet.effectiveDefensiveValue(players.me, 0), -1)
                }
            },
            'when the growth rate is 3, 2 ships are already there, and a fleet of 5 enemy ships are 4 turns away' : {
                'and is mine' : {
                    topic : function(){
                        var planet = Planet({ owner : players.me,
                                              ships : 2,
                                              growth : 3 });
                        planet.addIncomingForce(players.opponent, 5, 4);
                        return planet;
                    },
                    'right now should be equal to the number of ships' : function(planet) {
                        assert.equal(planet.effectiveDefensiveValue(players.me, 0), 2);
                    },
                    'in 3 turns should be the number of ships + turns * growth rate' : function(planet) {
                        assert.equal(planet.effectiveDefensiveValue(players.me, 3), 11);
                    },
                    'in 4 turns should be the number of ships + turns * growth rate - enemy ships' : function(planet) {
                        assert.equal(planet.effectiveDefensiveValue(players.me, 4), 9);
                    }
                },
                'and is the enemys' : {
                    topic : function(){
                        var planet = Planet({ owner : players.opponent,
                                              ships : 2,
                                              growth : 3 });
                        planet.addIncomingForce(players.opponent, 5, 4);
                        return planet;
                    },
                    'right now should be equal to the - number of ships' : function(planet) {
                        assert.equal(planet.effectiveDefensiveValue(players.me, 0), -3);
                    },
                    'in 3 turns should be negative the number of ships + turns * growth rate' : function(planet) {
                        assert.equal(planet.effectiveDefensiveValue(players.me, 3), -12);
                    },
                    'in 4 turns should be negative the number of ships + turns * growth rate - enemy ships' : function(planet) {
                        assert.equal(planet.effectiveDefensiveValue(players.me, 4), -20);
                    }
                },
            },
            'when the growth rate is 3, 2 ships are already there, and 9 ships are reinforcing in 3 turns' : {
                topic : function(){
                    var planet = Planet({ owner : players.me,
                                          ships : 2,
                                          growth : 3 });
                    planet.addIncomingForce(players.me, 9, 3);
                    return planet;
                },
                'right now should be equal to the number of ships' : function(planet) {
                    assert.equal(planet.effectiveDefensiveValue(players.me, 0), 2);
                },
                'in 3 turns should be the number of ships + turns * growth rate + friendly ships' : function(planet) {
                    assert.equal(planet.effectiveDefensiveValue(players.me, 3), 20);
                },
            },
            'when the growth rate is 5, 15 ships are already there, 20 enemy ships are 4 turns away, and 10 ships are reinforcing in 3 turns' : {
                topic : function() {
                    var planet = Planet({ owner : players.me,
                                          ships : 15,
                                          growth : 5 });
                    planet.addIncomingForce(players.me, 10, 3);
                    planet.addIncomingForce(players.opponent, 20, 4);
                    return planet;
                },
                'right now should be equal to the number of ships' : function(planet) {
                    assert.equal(planet.effectiveDefensiveValue(players.me, 0), 15);
                },
                'in 3 turns should be the number of ships + turns * growth rate + friendly ships' : function(planet) {
                    assert.equal(planet.effectiveDefensiveValue(players.me, 3), 40);
                },
                'in 4 turns should the number of ships + turns * growth rate + friendly ships - enemy ships' : function(planet) {
                    assert.equal(planet.effectiveDefensiveValue(players.me, 4), 25);
                }
            },
            'when the planet is neutral' : {
                'and the growth rate is 3, and 2 ships are already there' : {
                    topic : Planet({ owner : players.neutral,
                                     ships : 2,
                                     growth : 3 }),
                    'right now should be equal to negative the number of ships - 1' : function(planet) {
                        assert.equal(planet.effectiveDefensiveValue(players.me, 0), -3);
                    },
                    'next turn should be equal to negative the number of ships - 1' : function(planet) {
                        assert.equal(planet.effectiveDefensiveValue(players.me, 1), -3);
                    }
                }
            },
            'when the planet switches ownership' : {
                'should work with friendly planets' : function() {
                    var planet = Planet({ owner : players.me,
                                          ships : 15,
                                          growth : 5 });

                    planet.addIncomingForce(players.opponent, 25, 1);
                    planet.addIncomingForce(players.me, 25, 4);

                    assert.equal(planet.effectiveDefensiveValue(players.me, 0), 15);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 1), -6);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 2), -11);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 3), -16);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 4), 5);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 5), 10);
                },
                'should work with neutral planets' : function() {
                    var planet = Planet({ owner : players.neutral,
                                          ships : 15,
                                          growth : 5 });

                    planet.addIncomingForce(players.opponent, 25, 1);
                    planet.addIncomingForce(players.me, 35, 4);

                    assert.equal(planet.effectiveDefensiveValue(players.me, 0), -16);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 1), -11);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 2), -16);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 3), -21);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 4), 10);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 5), 15);
                },
                'should work with enemy planets' : function() {
                    var planet = Planet({ owner : players.opponent,
                                          ships : 15,
                                          growth : 5 });

                    planet.addIncomingForce(players.me, 25, 1);
                    planet.addIncomingForce(players.opponent, 25, 4);

                    assert.equal(planet.effectiveDefensiveValue(players.me, 0), -16);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 1), 5);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 2), 10);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 3), 15);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 4), -6);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 5), -11);
                },
                'should work with an enemy planet at the zero boundary' : function() {
                    var planet = Planet({ owner : players.opponent,
                                          ships : 15,
                                          growth : 5 });


                    planet.addIncomingForce(players.me, 20, 1);

                    assert.equal(planet.effectiveDefensiveValue(players.me, 1), -1);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 2), -6);
                },
                'should work with a neutral planet at the zero boundary' : function() {
                    var planet = Planet({ owner : players.neutral,
                                          ships : 15,
                                          growth : 5 });

                    planet.addIncomingForce(players.me, 15, 1);
                    planet.addIncomingForce(players.me, 1, 3);

                    assert.equal(planet.effectiveDefensiveValue(players.me, 1), -1);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 2), -1);
                    assert.equal(planet.effectiveDefensiveValue(players.me, 3), 1);
                }
            }
        }
    },
    'clone' : {
        'destructive action should not affect original' : {
            'adding fleets' : ''
        }
    }
}).export(module);
