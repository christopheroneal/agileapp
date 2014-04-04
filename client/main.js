Stories = new Meteor.Collection('stories');
Tasks = new Meteor.Collection('tasks');

Session.setDefault('story_id', null);
Session.setDefault('task_id', null);

UI.registerHelper('story_selected', function() {
  return !Session.equals('story_id', null);
});

UI.registerHelper('task_selected', function() {
  return !Session.equals('task_id', null);
});

UI.registerHelper('stories', function() {
  return Stories.find({});
});

UI.registerHelper('story_id', function() {
  return Session.get('story_id');
});

UI.registerHelper('task_id', function() {
  return Session.get('task_id');
});

UI.registerHelper('get_story', function(id) {
  return Stories.findOne({_id: id});
});

UI.registerHelper('get_task', function(id) {
  return Tasks.findOne({_id: id});
});

UI.registerHelper('get_story_tasks', function(story_id) {
  return Tasks.find({story: story_id});
});

Template.new_story.events = {
  'keydown input#newstory' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      var story = document.getElementById('newstory');

      if (story.value != '') {
        Stories.insert({
          title: story.value,
          last_modified: new Date(),
          description: "",
          completion: 'Defined',
        });
        document.getElementById('newstory').value = '';
        story.value = '';
      }
    }
  }
}

Template.new_task.events = {
  'keydown input#newtask' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      var task= document.getElementById('newtask');

      if (task.value != '') {
        Tasks.insert({
          title: task.value,
          story: Session.get('story_id'),
          last_modified: new Date(),
          description: "",
          completion: 'Defined',
        });
        document.getElementById('newtask').value = '';
        task.value = '';
      }
    }
  }
}

Template.story_list.events({
  'mousedown .story': function (evt) { // select list
    Session.set('story_id', this._id);
  },
});

Template.task_list.events({
  'mousedown .task': function (evt) { // select list
    Session.set('task_id', this._id);
  },
});
