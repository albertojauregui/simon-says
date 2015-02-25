$(function(){

    var AppView = Backbone.View.extend({

      el: $('#circle-container'),

      events: {
	  "click #middle-info": "startGame",
	    "click .item-01, .item-02, .item-03, .item-04": "onItemClick",
	},
	
      initialize: function() {
	  
	  this.middleInfo = $('#middle-info'); 
	  this.item01 = $('.item-01');
	  this.item02 = $('.item-02');
	  this.item03 = $('.item-03');
	  this.item04 = $('.item-04');
	  this.items = [this.item01,this.item02,this.item03,this.item04];

	  this.setMessage("Start the simon");

	  this.array =[];
	  this.shortArray =[];
	  this.playerArray = [];
	  this.roundNumber = 0;
	  this.clickTime = 200;
	  this.waitTime = 600;
	  this.gameOn = false;
	  this.gameOver = false;
	  
	},

      startGame: function(){
	  if(!this.gameOn){
	    this.gameOn = true;
	    this.newRound();
	  }
	},
      
      onItemClick: function(e){
	  console.log(this.gameOn);
	  if(this.gameOn){
	    var nth = $(e.target).attr('class').replace('item-','').replace('active','').replace(' ','');
	    console.log(nth);
	    $("audio").remove();
	    $('<audio id="sound-'+nth+'"><source src="sounds/'+nth+'.wav" type="audio/wav"></audio>').appendTo('body');
	    $('#sound-'+nth+'')[0].play();
	    $(e.target).addClass('active');
	    $(e.target).removeClass('active');
	    
	  }
	},

	  areArraysEqual: function(a1,a2) {
	  return JSON.stringify(a1)==JSON.stringify(a2);
	},
	  
	  playerDies: function(){
	  var score = this.shortArray.length - 1;
	  this.setMessage('Score: ' + score);
	  this.gameOver = true;
	},

	  newRound: function(){
	  var self = this;
	  this.delayTime = this.clickTime*2;
	  this.roundNumber++;
	  this.setMessage('round');
	  console.log(this.delayTime);
	  setTimeout(function(){
	      self.setMessage(self.roundNumber);
	    },this.waitTime);
	  setTimeout(function(){
	      self.computerPlays();
	    },this.waitTime * 2);
	  setTimeout(function(){
		self.computerFinished();
	      },this.waitTime * 2 + this.delayTime * this.roundNumber);
	},

	  computerPlays: function(){
	  console.log('computer plays');
	},

	  computerFinished: function(){
	  console.log('computer finished');
	},
	  	  
	  setMessage: function(arg){
	    var mih = this.middleInfo.height();
	    if(Array.isArray(arg)){var text = arg[Math.floor(Math.random()*arg.length)];}
	    else{var text = arg;}
	    var p = this.middleInfo.html("<p>" + text + "</p>").children('p');
	    var ph = p.height();
	    var mt = (mih-ph)/2;
	    p.animate({"marginTop" : mt})
	      }
      
      });
  
    var App = new AppView;

  });
