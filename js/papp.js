$(function(){

    var AppView = Backbone.View.extend({
	
      el: $('#pentagon-container'),

	  events: {
	  "click #info": "startGame",
	    "click #item1, #item2, #item3, #item4, #item5": "onItemClick",
	    },
	
      initialize: function() {
	  this.setMessage("CLICK TO<br />START");
	  this.computerArray = [];
	  this.playerArray = [];
	  this.roundNumber = 0;
	  this.gameOn = false;
	  this.gameOver = false;
	  this.isPlayer = false;
	},
	  
	  startGame: function(){
	  if(!this.gameOn){
	    this.gameOn = true;
	    this.newRound();
	    this.roundNumber = 0;
	  }
	},
	  
	  onItemClick: function(e){
	  if(this.gameOn){
	    var nth = $(e.target).attr('id').replace('item','').replace(' ','');
	    if(this.isPlayer){
	      this.checkPlayer(nth);
	    }
	    $('#sound-0'+nth+'')[0].play();
	    $(e.target).addClass('active');
	    setTimeout(function() { // turn off color
		$(e.target).removeClass('active');
	      }, 200);
	  }
	},

	  areArraysEqual: function(a1,a2) {
	  return a1.toString() == a2.toString();
	},
	  
	  playerDies: function(){
	  var score = this.computerArray.length - 1;
	  this.setMessage('Score: ' + score);
	  this.gameOver = true;
	  this.gameOn = false;
	},

	  newRound: function(){
	  var self = this;
	  this.roundNumber++;
	  this.setMessage('ROUND<br />' + self.roundNumber);
	  self.computerPlays();
	},
	  
	  computerPlays: function(){
	  var self = this;
	  var next = Math.floor((Math.random()*5)+1);
	  var i = 0;
	  this.computerArray[this.computerArray.length] = next;
	  (function play() { // recursive loop to play clicks
	    setTimeout( function() {
		$('#item'+self.computerArray[i]).trigger('click');
		console.log(self.computerArray[i]);
		i++;
		if( i < (self.computerArray).length ) {
		  play();
		}else{
		  self.computerFinished();
		}
	      }, 500)
	      })(); // end recursion
	},
	  
	  computerFinished: function(){
	  this.setMessage("YOUR<br />TURN");
	  this.isPlayer = true;
	  console.log('computer finished');
	},

	  checkPlayer: function(e){
	  
	  if(this.playerArray.length < this.computerArray.length){
	    this.playerArray.push(e);
	    if(this.playerArray[this.playerArray.length-1] != this.computerArray[this.playerArray.length-1]){
	      if(!this.gameOver){this.playerDies();}
	    }
	  }
	  if(this.areArraysEqual(this.playerArray, this.computerArray)){
	    this.isPlayer = false;
	    var self = this;
	    this.playerArray = [];
	    this.newRound();
	  }

	},
	  	  
	  setMessage: function(arg){
	  $("#info").html(arg);
	}
	
      });
  
    var App = new AppView;

  });
