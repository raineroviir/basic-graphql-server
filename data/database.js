// // Model types
// class User extends Object {}
// class Widget extends Object {}
//
// // Mock data
// var viewer = new User();
// viewer.id = '1';
// viewer.name = 'Anonymous';
// var widgets = ['What\'s-it', 'Who\'s-it', 'How\'s-it'].map((name, i) => {
//   var widget = new Widget();
//   widget.name = name;
//   widget.id = `${i}`;
//   return widget;
// });
//
// module.exports = {
//   // Export methods that your schema can use to interact with your database
//   getUser: (id) => id === viewer.id ? viewer : null,
//   getViewer: () => viewer,
//   getWidget: (id) => widgets.find(w => w.id === id),
//   getWidgets: () => widgets,
//   User,
//   Widget,
// };

// Model types
export class Test extends Object {}

//Mock data

var tester = new Test();
tester.id = '1';
tester.name = 'rainer';

var testOne = 99;

export function getTest() {
  return tester;
}

export function getTestOne() {
  return testOne;
}
