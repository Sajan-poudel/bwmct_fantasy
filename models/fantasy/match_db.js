var Mongoose=require('mongoose');
var Schema=Mongoose.Schema;

var matchSchema = new Schema({
    position : Number,
    team1 : String,
    team2 : String,
    dateStart : Date,
    type : String,
    completed : {type : Boolean, default : false},
    winningTeam : String,
    winType : String, 
    winBy : Number,
    run1 : Number,
    extras1 : Number,
    wicket1 : Number, 
    over1 : Number,
    run2 : Number,
    wicket2 : Number, 
    over2 : Number,
    extras2 : Number,
    manOfMatch : String

});

matchSchema.method('update',function(updates, callback){
    if(updates.team1) this.team1=updates.team1;
    if(updates.team2) this.team2=updates.team2;
    if(updates.type) this.type=updates.type;
    if(updates.day){ 
    let y=updates.month+' '+updates.day+','+updates.year+' '+updates.hours+':'+updates.minutes+':00';
    this.dateStart=new Date(y);
    }
    if(updates.completed==='true'){
        this.completed=true;
        if(updates.winningTeam) this.winningTeam=parseInt(updates.winningTeam);
        if(updates.winBy) this.winBy=parseInt(updates.winBy);
        if(updates.winType) this.winType=updates.winType;
        if(updates.manOfMatch) this.manOfMatch=updates.manOfMatch;
        if(updates.run1) this.run1=parseInt(updates.run1);
        if(updates.extras1) this.extras1=parseInt(updates.extras1);
        if(updates.wicket1) this.wicket1=parseInt(updates.wicket1);
        if(updates.over1) this.over1=parseFloat(updates.over1);
        if(updates.run2) this.run2=parseInt(updates.run2);
        if(updates.wicket2) this.wicket2=parseInt(updates.wicket2);
        if(updates.over2) this.over2=parseFloat(updates.over2);
        if(updates.extras2) this.extras2=parseInt(updates.extras2);
    }else{
        this.completed=false;
    }
    this.save(callback);
});

var MatchInfo=Mongoose.model('match_data', matchSchema, 'match_data');
module.exports=MatchInfo;