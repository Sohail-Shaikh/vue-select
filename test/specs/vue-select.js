var assert = require("assert");
var Vue = require("vue");
var Demo = require("../../demo/demo.vue");

var getVM = function(rootId, initResult1, initResult2, initResult3) {
  return Vue.extend({
    template: "<div><demo></demo></div>",
    el: function() {
      var el = document.createElement("div");
      el.id = rootId;
      document.body.appendChild(el);
      return el;
    },
    components: {
      "demo": Demo
    },
    data: function() {
      return {
        result1: initResult1,
        result2: initResult2,
        result3: initResult3
      };
    }
  });
};

describe("vue-select", function() {

  describe("static render", function() {
    var VM = getVM("static-render", "", "value2", "value6");
    var vm = new VM();

    it("select1", function(done) {
      vm.$nextTick(function() {
        var root = $("#static-render");
        var select1 = root.find(".vue-select1");
        assert.equal(select1.prop("tagName"), "SELECT");
        var options1 = select1.find("option");
        assert.equal(options1.length, 3);
        assert.equal(options1[0].text, "value1");
        assert.equal(options1[0].value, "value1");
        assert.equal(options1[1].text, "value2");
        assert.equal(options1[1].value, "value2");
        assert.equal(options1[2].text, "value3");
        assert.equal(options1[2].value, "value3");

        // check the value of the select1
        assert.equal(select1.val(), null);

        // check the text content of select1
        var select1Text = select1.next(".select2").find(".select2-selection__rendered");
        assert.equal(select1Text.text(), "");

        //  check results
        var result1 = root.find(".vue-result1");
        assert.equal(result1.text(), "");

        // check vm data
        assert.equal(vm.result1, "");

        done();
      });
    });

    it("select2", function(done) {
      vm.$nextTick(function() {
        var root = $("#static-render");
        //  check select2
        var select2 = root.find(".vue-select2");
        assert.equal(select2.prop("tagName"), "SELECT");
        var options2 = select2.find("option");
        assert.equal(options2.length, 3);
        assert.equal(options2[0].text, "name1");
        assert.equal(options2[0].value, "value1");
        assert.equal(options2[1].text, "name2");
        assert.equal(options2[1].value, "value2");
        assert.equal(options2[2].text, "name3");
        assert.equal(options2[2].value, "value3");

        // check the value of the select2
        assert.equal(select2.val(), "value2");

        // check the text content of select2
        var select2Text = select2.next(".select2").find(".select2-selection__rendered");
        assert.equal(select2Text.text(), "name2");

        //  check results
        var result2 = root.find(".vue-result2");
        assert.equal(result2.text(), "value2");

        // check vm data
        assert.equal(vm.result2, "value2");

        done();
      });
    });

    it("select3", function(done) {
      vm.$nextTick(function() {
        var root = $("#static-render");
        //  check select3
        var select3 = root.find(".vue-select3");
        assert.equal(select3.prop("tagName"), "SELECT");
        var optgroups3 = select3.find("optgroup");
        assert.equal(optgroups3.length, 2);
        var options3_1 = $(optgroups3[0]).find("option");
        assert.equal(options3_1.length, 3);
        assert.equal(options3_1[0].text, "name1");
        assert.equal(options3_1[0].value, "value1");
        assert.equal(options3_1[1].text, "name2");
        assert.equal(options3_1[1].value, "value2");
        assert.equal(options3_1[2].text, "name3");
        assert.equal(options3_1[2].value, "value3");

        var options3_2 = $(optgroups3[1]).find("option");
        assert.equal(options3_2.length, 3);
        assert.equal(options3_2[0].text, "name4");
        assert.equal(options3_2[0].value, "value4");
        assert.equal(options3_2[1].text, "name5");
        assert.equal(options3_2[1].value, "value5");
        assert.equal(options3_2[2].text, "name6");
        assert.equal(options3_2[2].value, "value6");

        // check the value of the select3
        assert.equal(select3.val(), "value6");

        // check the text content of select1
        var select3Text = select3.next(".select2").find(".select2-selection__rendered");
        assert.equal(select3Text.text(), "name6");

        //  check results
        var result3 = root.find(".vue-result3");
        assert.equal(result3.text(), "value6");

        // check vm data
        assert.equal(vm.result3, "value6");

        done();
      });
    });
  });

  describe("change the model", function() {
    var VM = getVM("change-model", "", "value2", "value6");
    var vm = new VM();
    it("select1", function(done) {
      vm.$nextTick(function() {
        var root = $("#change-model");
        var select1 = root.find(".vue-select1");
        var select1Text = select1.next(".select2").find(".select2-selection__rendered");
        assert.equal(select1.val(), null);
        assert.equal(select1Text.text(), "");
        // change the vm
        vm.result1 = "value2";
        vm.$nextTick(function() {
          assert.equal(select1.val(), "value2");
          assert.equal(select1Text.text(), "value2");
          done();
        });
      });
    });

    it("select2", function(done) {
      vm.$nextTick(function() {
        var root = $("#change-model");
        var select2 = root.find(".vue-select2");
        var select2Text = select2.next(".select2").find(".select2-selection__rendered");
        assert.equal(select2.val(), "value2");
        assert.equal(select2Text.text(), "name2");
        // change the vm
        vm.result2 = "value1";
        vm.$nextTick(function() {
          assert.equal(select2.val(), "value1");
          assert.equal(select2Text.text(), "name1");
          done();
        });
      });
    });

    it("select3", function(done) {
      vm.$nextTick(function() {
        var root = $("#change-model");
        var select3 = root.find(".vue-select3");
        var select3Text = select3.next(".select2").find(".select2-selection__rendered");
        assert.equal(select3.val(), "value6");
        assert.equal(select3Text.text(), "name6");
        // change the vm
        vm.result3 = "value3";
        vm.$nextTick(function() {
          assert.equal(select3.val(), "value3");
          assert.equal(select3Text.text(), "name3");
          done();
        });
      });
    });
  });

  describe("change the selection", function() {
    var VM = getVM("change-selection", "", "value2", "value6");
    var vm = new VM();

    it("select1", function(done) {
      vm.$nextTick(function() {
        var root = $("#change-selection");
        var select1 = root.find(".vue-select1");
        var select1Text = select1.next(".select2").find(".select2-selection__rendered");
        assert.equal(select1.val(), null);
        assert.equal(select1Text.text(), "");
        // change the selection
        select1.val("value2").trigger("change");
        vm.$nextTick(function() {
          assert.equal(select1.val(), "value2");
          assert.equal(select1Text.text(), "value2");
          assert.equal(vm.result1, "value2");
          done();
        });
      });
    });


    it("select2", function(done) {
      vm.$nextTick(function() {
        var root = $("#change-selection");
        var select2 = root.find(".vue-select2");
        var select2Text = select2.next(".select2").find(".select2-selection__rendered");
        assert.equal(select2.val(), "value2");
        assert.equal(select2Text.text(), "name2");
        // change the selection
        select2.val("value3").trigger("change");
        vm.$nextTick(function() {
          assert.equal(select2.val(), "value3");
          assert.equal(select2Text.text(), "name3");
          assert.equal(vm.result2, "value3");
          done();
        });
      });
    });


    it("select3", function(done) {
      vm.$nextTick(function() {
        var root = $("#change-selection");
        var select3 = root.find(".vue-select3");
        var select3Text = select3.next(".select2").find(".select2-selection__rendered");
        assert.equal(select3.val(), "value6");
        assert.equal(select3Text.text(), "name6");
        // change the selection
        select3.val("value4").trigger("change");
        vm.$nextTick(function() {
          assert.equal(select3.val(), "value4");
          assert.equal(select3Text.text(), "name4");
          assert.equal(vm.result3, "value4");
          done();
        });
      });
    });
  });
});