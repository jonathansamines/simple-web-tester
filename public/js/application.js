var tester = {
  init: function initComponents(callback) {
    $(document).ready(callback);
  },
  components: {}
};

tester.components.checker = function initChecker() {
  var $checkInputs = $('input:radio, input:checkbox');
  $checkInputs.iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_square-blue',
    increaseArea: '20%'
  });
};

tester.components.foundation = function initFoundation() {
  $(document).foundation();
};

tester.init(function ready() {
  tester.components.checker();
  tester.components.foundation();
});
