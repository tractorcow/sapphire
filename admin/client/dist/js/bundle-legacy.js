(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
})({
    1: [ function(require, module, exports) {
        "use strict";
        require("../legacy/LeftAndMain.Layout.js");
        require("../legacy/LeftAndMain.js");
        require("../legacy/LeftAndMain.ActionTabSet.js");
        require("../legacy/LeftAndMain.Panel.js");
        require("../legacy/LeftAndMain.Tree.js");
        require("../legacy/LeftAndMain.Content.js");
        require("../legacy/LeftAndMain.EditForm.js");
        require("../legacy/LeftAndMain.Menu.js");
        require("../legacy/LeftAndMain.Preview.js");
        require("../legacy/LeftAndMain.BatchActions.js");
        require("../legacy/LeftAndMain.FieldHelp.js");
        require("../legacy/LeftAndMain.FieldDescriptionToggle.js");
        require("../legacy/LeftAndMain.TreeDropdownField.js");
        require("../legacy/AddToCampaignForm.js");
    }, {
        "../legacy/AddToCampaignForm.js": 2,
        "../legacy/LeftAndMain.ActionTabSet.js": 3,
        "../legacy/LeftAndMain.BatchActions.js": 4,
        "../legacy/LeftAndMain.Content.js": 5,
        "../legacy/LeftAndMain.EditForm.js": 6,
        "../legacy/LeftAndMain.FieldDescriptionToggle.js": 7,
        "../legacy/LeftAndMain.FieldHelp.js": 8,
        "../legacy/LeftAndMain.Layout.js": 9,
        "../legacy/LeftAndMain.Menu.js": 10,
        "../legacy/LeftAndMain.Panel.js": 11,
        "../legacy/LeftAndMain.Preview.js": 12,
        "../legacy/LeftAndMain.Tree.js": 13,
        "../legacy/LeftAndMain.TreeDropdownField.js": 14,
        "../legacy/LeftAndMain.js": 15
    } ],
    2: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        _jQuery2.default.entwine("ss", function($) {
            $(".add-to-campaign-action, #add-to-campaign__action").entwine({
                onclick: function onclick() {
                    var dialog = $("#add-to-campaign__dialog");
                    if (dialog.length) {
                        dialog.open();
                    } else {
                        dialog = $('<div id="add-to-campaign__dialog" class="add-to-campaign__dialog" />');
                        $("body").append(dialog);
                    }
                    if (dialog.children().length === 0) dialog.addClass("loading");
                    var form = this.closest("form");
                    var button = this;
                    var formData = form.serializeArray();
                    formData.push({
                        name: button.attr("name"),
                        value: "1"
                    });
                    $.ajax({
                        url: form.attr("action"),
                        data: formData,
                        type: "POST",
                        global: false,
                        complete: function complete() {
                            dialog.removeClass("loading");
                        },
                        success: function success(data, status, xhr) {
                            if (xhr.getResponseHeader("Content-Type").indexOf("text/plain") === 0) {
                                var container = $('<div class="add-to-campaign__response add-to-campaign__response--good">' + "<span></span></div>");
                                container.find("span").text(data);
                                dialog.append(container);
                            } else {
                                dialog.html(data);
                            }
                        },
                        error: function error(xhr) {
                            var error = xhr.responseText || "Something went wrong. Please try again in a few minutes.";
                            var container = $('<div class="add-to-campaign__response add-to-campaign__response--error">' + "<span></span></div>");
                            container.find("span").text(error);
                            dialog.append(container);
                        }
                    });
                    return false;
                }
            });
            $("#add-to-campaign__dialog").entwine({
                onadd: function onadd() {
                    if (!this.is(".ui-dialog-content")) {
                        this.ssdialog({
                            autoOpen: true,
                            minHeight: 200,
                            maxHeight: 200,
                            minWidth: 200,
                            maxWidth: 500
                        });
                    }
                    this._super();
                },
                open: function open() {
                    this.ssdialog("open");
                },
                close: function close() {
                    this.ssdialog("close");
                },
                onssdialogclose: function onssdialogclose() {
                    this.empty();
                },
                "onchosen:showing_dropdown": function onchosenShowing_dropdown() {
                    this.css({
                        overflow: "visible"
                    });
                },
                "onchosen:hiding_dropdown": function onchosenHiding_dropdown() {
                    this.css({
                        overflow: ""
                    });
                }
            });
        });
    }, {
        jQuery: "jQuery"
    } ],
    3: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        _jQuery2.default.entwine("ss", function($) {
            $(".ss-tabset.ss-ui-action-tabset").entwine({
                IgnoreTabState: true,
                onadd: function onadd() {
                    this._super();
                    this.tabs({
                        collapsible: true,
                        active: false
                    });
                },
                onremove: function onremove() {
                    var frame = $(".cms-container").find("iframe");
                    frame.each(function(index, iframe) {
                        try {
                            $(iframe).contents().off("click.ss-ui-action-tabset");
                        } catch (e) {
                            console.warn("Unable to access iframe, possible https mis-match");
                        }
                    });
                    $(document).off("click.ss-ui-action-tabset");
                    this._super();
                },
                ontabsbeforeactivate: function ontabsbeforeactivate(event, ui) {
                    this.riseUp(event, ui);
                },
                onclick: function onclick(event, ui) {
                    this.attachCloseHandler(event, ui);
                },
                attachCloseHandler: function attachCloseHandler(event, ui) {
                    var that = this, frame = $(".cms-container").find("iframe"), _closeHandler;
                    _closeHandler = function closeHandler(event) {
                        var panel, frame;
                        panel = $(event.target).closest(".ss-ui-action-tabset .ui-tabs-panel");
                        if (!$(event.target).closest(that).length && !panel.length) {
                            that.tabs("option", "active", false);
                            frame = $(".cms-container").find("iframe");
                            frame.each(function(index, iframe) {
                                $(iframe).contents().off("click.ss-ui-action-tabset", _closeHandler);
                            });
                            $(document).off("click.ss-ui-action-tabset", _closeHandler);
                        }
                    };
                    $(document).on("click.ss-ui-action-tabset", _closeHandler);
                    if (frame.length > 0) {
                        frame.each(function(index, iframe) {
                            $(iframe).contents().on("click.ss-ui-action-tabset", _closeHandler);
                        });
                    }
                },
                riseUp: function riseUp(event, ui) {
                    var elHeight, trigger, endOfWindow, elPos, activePanel, activeTab, topPosition, containerSouth, padding;
                    elHeight = $(this).find(".ui-tabs-panel").outerHeight();
                    trigger = $(this).find(".ui-tabs-nav").outerHeight();
                    endOfWindow = $(window).height() + $(document).scrollTop() - trigger;
                    elPos = $(this).find(".ui-tabs-nav").offset().top;
                    activePanel = ui.newPanel;
                    activeTab = ui.newTab;
                    if (elPos + elHeight >= endOfWindow && elPos - elHeight > 0) {
                        this.addClass("rise-up");
                        if (activeTab.position() !== null) {
                            topPosition = -activePanel.outerHeight();
                            containerSouth = activePanel.parents(".toolbar--south");
                            if (containerSouth) {
                                padding = activeTab.offset().top - containerSouth.offset().top;
                                topPosition = topPosition - padding;
                            }
                            $(activePanel).css("top", topPosition + "px");
                        }
                    } else {
                        this.removeClass("rise-up");
                        if (activeTab.position() !== null) {
                            $(activePanel).css("bottom", "100%");
                        }
                    }
                    return false;
                }
            });
            $(".cms-content-actions .ss-tabset.ss-ui-action-tabset").entwine({
                ontabsbeforeactivate: function ontabsbeforeactivate(event, ui) {
                    this._super(event, ui);
                    if ($(ui.newPanel).length > 0) {
                        $(ui.newPanel).css("left", ui.newTab.position().left + "px");
                    }
                }
            });
            $(".cms-actions-row.ss-tabset.ss-ui-action-tabset").entwine({
                ontabsbeforeactivate: function ontabsbeforeactivate(event, ui) {
                    this._super(event, ui);
                    $(this).closest(".ss-ui-action-tabset").removeClass("tabset-open tabset-open-last");
                }
            });
            $(".cms-content-fields .ss-tabset.ss-ui-action-tabset").entwine({
                ontabsbeforeactivate: function ontabsbeforeactivate(event, ui) {
                    this._super(event, ui);
                    if ($(ui.newPanel).length > 0) {
                        if ($(ui.newTab).hasClass("last")) {
                            $(ui.newPanel).css({
                                left: "auto",
                                right: "0px"
                            });
                            $(ui.newPanel).parent().addClass("tabset-open-last");
                        } else {
                            $(ui.newPanel).css("left", ui.newTab.position().left + "px");
                            if ($(ui.newTab).hasClass("first")) {
                                $(ui.newPanel).css("left", "0px");
                                $(ui.newPanel).parent().addClass("tabset-open");
                            }
                        }
                    }
                }
            });
            $(".cms-tree-view-sidebar .cms-actions-row.ss-tabset.ss-ui-action-tabset").entwine({
                "from .ui-tabs-nav li": {
                    onhover: function onhover(e) {
                        $(e.target).parent().find("li .active").removeClass("active");
                        $(e.target).find("a").addClass("active");
                    }
                },
                ontabsbeforeactivate: function ontabsbeforeactivate(event, ui) {
                    this._super(event, ui);
                    $(ui.newPanel).css({
                        left: "auto",
                        right: "auto"
                    });
                    if ($(ui.newPanel).length > 0) {
                        $(ui.newPanel).parent().addClass("tabset-open");
                    }
                }
            });
        });
    }, {
        jQuery: "jQuery"
    } ],
    4: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        var _i18n = require("i18n");
        var _i18n2 = _interopRequireDefault(_i18n);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        _jQuery2.default.entwine("ss.tree", function($) {
            $("#Form_BatchActionsForm").entwine({
                Actions: [],
                getTree: function getTree() {
                    return $(".cms-tree");
                },
                fromTree: {
                    oncheck_node: function oncheck_node(e, data) {
                        this.serializeFromTree();
                    },
                    onuncheck_node: function onuncheck_node(e, data) {
                        this.serializeFromTree();
                    }
                },
                registerDefault: function registerDefault() {
                    this.register("admin/pages/batchactions/publish", function(ids) {
                        var confirmed = confirm(_i18n2.default.inject(_i18n2.default._t("CMSMAIN.BATCH_PUBLISH_PROMPT", "You have {num} page(s) selected.\n\nDo you really want to publish?"), {
                            num: ids.length
                        }));
                        return confirmed ? ids : false;
                    });
                    this.register("admin/pages/batchactions/unpublish", function(ids) {
                        var confirmed = confirm(_i18n2.default.inject(_i18n2.default._t("CMSMAIN.BATCH_UNPUBLISH_PROMPT", "You have {num} page(s) selected.\n\nDo you really want to unpublish"), {
                            num: ids.length
                        }));
                        return confirmed ? ids : false;
                    });
                    this.register("admin/pages/batchactions/delete", function(ids) {
                        var confirmed = confirm(_i18n2.default.inject(_i18n2.default._t("CMSMAIN.BATCH_DELETE_PROMPT", "You have {num} page(s) selected.\n\nDo you really want to delete?"), {
                            num: ids.length
                        }));
                        return confirmed ? ids : false;
                    });
                    this.register("admin/pages/batchactions/archive", function(ids) {
                        var confirmed = confirm(_i18n2.default.inject(_i18n2.default._t("CMSMAIN.BATCH_ARCHIVE_PROMPT", "You have {num} page(s) selected.\n\nAre you sure you want to archive these pages?\n\nThese pages and all of their children pages will be unpublished and sent to the archive."), {
                            num: ids.length
                        }));
                        return confirmed ? ids : false;
                    });
                    this.register("admin/pages/batchactions/restore", function(ids) {
                        var confirmed = confirm(_i18n2.default.inject(_i18n2.default._t("CMSMAIN.BATCH_RESTORE_PROMPT", "You have {num} page(s) selected.\n\nDo you really want to restore to stage?\n\nChildren of archived pages will be restored to the root level, unless those pages are also being restored."), {
                            num: ids.length
                        }));
                        return confirmed ? ids : false;
                    });
                    this.register("admin/pages/batchactions/deletefromlive", function(ids) {
                        var confirmed = confirm(_i18n2.default.inject(_i18n2.default._t("CMSMAIN.BATCH_DELETELIVE_PROMPT", "You have {num} page(s) selected.\n\nDo you really want to delete these pages from live?"), {
                            num: ids.length
                        }));
                        return confirmed ? ids : false;
                    });
                },
                onadd: function onadd() {
                    this.registerDefault();
                    this._super();
                },
                register: function register(type, callback) {
                    this.trigger("register", {
                        type: type,
                        callback: callback
                    });
                    var actions = this.getActions();
                    actions[type] = callback;
                    this.setActions(actions);
                },
                unregister: function unregister(type) {
                    this.trigger("unregister", {
                        type: type
                    });
                    var actions = this.getActions();
                    if (actions[type]) delete actions[type];
                    this.setActions(actions);
                },
                refreshSelected: function refreshSelected(rootNode) {
                    var self = this, st = this.getTree(), ids = this.getIDs(), allIds = [], viewMode = $(".cms-content-batchactions-button"), actionUrl = this.find(":input[name=Action]").val();
                    if (rootNode == null) rootNode = st;
                    for (var idx in ids) {
                        $($(st).getNodeByID(idx)).addClass("selected").attr("selected", "selected");
                    }
                    if (!actionUrl || actionUrl == -1 || !viewMode.hasClass("active")) {
                        $(rootNode).find("li").each(function() {
                            $(this).setEnabled(true);
                        });
                        return;
                    }
                    $(rootNode).find("li").each(function() {
                        allIds.push($(this).data("id"));
                        $(this).addClass("treeloading").setEnabled(false);
                    });
                    var actionUrlParts = $.path.parseUrl(actionUrl);
                    var applicablePagesUrl = actionUrlParts.hrefNoSearch + "/applicablepages/";
                    applicablePagesUrl = $.path.addSearchParams(applicablePagesUrl, actionUrlParts.search);
                    applicablePagesUrl = $.path.addSearchParams(applicablePagesUrl, {
                        csvIDs: allIds.join(",")
                    });
                    jQuery.getJSON(applicablePagesUrl, function(applicableIDs) {
                        jQuery(rootNode).find("li").each(function() {
                            $(this).removeClass("treeloading");
                            var id = $(this).data("id");
                            if (id == 0 || $.inArray(id, applicableIDs) >= 0) {
                                $(this).setEnabled(true);
                            } else {
                                $(this).removeClass("selected").setEnabled(false);
                                $(this).prop("selected", false);
                            }
                        });
                        self.serializeFromTree();
                    });
                },
                serializeFromTree: function serializeFromTree() {
                    var tree = this.getTree(), ids = tree.getSelectedIDs();
                    this.setIDs(ids);
                    return true;
                },
                setIDs: function setIDs(ids) {
                    this.find(":input[name=csvIDs]").val(ids ? ids.join(",") : null);
                },
                getIDs: function getIDs() {
                    var value = this.find(":input[name=csvIDs]").val();
                    return value ? value.split(",") : [];
                },
                onsubmit: function onsubmit(e) {
                    var self = this, ids = this.getIDs(), tree = this.getTree(), actions = this.getActions();
                    if (!ids || !ids.length) {
                        alert(_i18n2.default._t("CMSMAIN.SELECTONEPAGE", "Please select at least one page"));
                        e.preventDefault();
                        return false;
                    }
                    var type = this.find(":input[name=Action]").val();
                    if (actions[type]) {
                        ids = this.getActions()[type].apply(this, [ ids ]);
                    }
                    if (!ids || !ids.length) {
                        e.preventDefault();
                        return false;
                    }
                    this.setIDs(ids);
                    tree.find("li").removeClass("failed");
                    var button = this.find(":submit:first");
                    button.addClass("loading");
                    jQuery.ajax({
                        url: type,
                        type: "POST",
                        data: this.serializeArray(),
                        complete: function complete(xmlhttp, status) {
                            button.removeClass("loading");
                            tree.jstree("refresh", -1);
                            self.setIDs([]);
                            self.find(":input[name=Action]").val("").change();
                            var msg = xmlhttp.getResponseHeader("X-Status");
                            if (msg) statusMessage(decodeURIComponent(msg), status == "success" ? "good" : "bad");
                        },
                        success: function success(data, status) {
                            var id, node;
                            if (data.modified) {
                                var modifiedNodes = [];
                                for (id in data.modified) {
                                    node = tree.getNodeByID(id);
                                    tree.jstree("set_text", node, data.modified[id]["TreeTitle"]);
                                    modifiedNodes.push(node);
                                }
                                $(modifiedNodes).effect("highlight");
                            }
                            if (data.deleted) {
                                for (id in data.deleted) {
                                    node = tree.getNodeByID(id);
                                    if (node.length) tree.jstree("delete_node", node);
                                }
                            }
                            if (data.error) {
                                for (id in data.error) {
                                    node = tree.getNodeByID(id);
                                    $(node).addClass("failed");
                                }
                            }
                        },
                        dataType: "json"
                    });
                    e.preventDefault();
                    return false;
                }
            });
            $(".cms-content-batchactions-button").entwine({
                onmatch: function onmatch() {
                    this._super();
                    this.updateTree();
                },
                onunmatch: function onunmatch() {
                    this._super();
                },
                onclick: function onclick(e) {
                    this.updateTree();
                },
                updateTree: function updateTree() {
                    var tree = $(".cms-tree"), form = $("#Form_BatchActionsForm");
                    this._super();
                    if (this.data("active")) {
                        tree.addClass("multiple");
                        tree.removeClass("draggable");
                        form.serializeFromTree();
                    } else {
                        tree.removeClass("multiple");
                        tree.addClass("draggable");
                    }
                    $("#Form_BatchActionsForm").refreshSelected();
                }
            });
            $("#Form_BatchActionsForm select[name=Action]").entwine({
                onchange: function onchange(e) {
                    var form = $(e.target.form), btn = form.find(":submit"), selected = $(e.target).val();
                    if (!selected || selected == -1) {
                        btn.attr("disabled", "disabled").button("refresh");
                    } else {
                        btn.removeAttr("disabled").button("refresh");
                    }
                    $("#Form_BatchActionsForm").refreshSelected();
                    this.trigger("chosen:updated");
                    this._super(e);
                }
            });
        });
    }, {
        i18n: "i18n",
        jQuery: "jQuery"
    } ],
    5: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        _jQuery2.default.entwine("ss", function($) {
            $(".cms-content").entwine({
                onadd: function onadd() {
                    var self = this;
                    this.find(".cms-tabset").redrawTabs();
                    this._super();
                },
                redraw: function redraw() {
                    if (window.debug) console.log("redraw", this.attr("class"), this.get(0));
                    this.add(this.find(".cms-tabset")).redrawTabs();
                    this.find(".cms-content-header").redraw();
                    this.find(".cms-content-actions").redraw();
                }
            });
            $(".cms-content .cms-tree").entwine({
                onadd: function onadd() {
                    var self = this;
                    this._super();
                    this.bind("select_node.jstree", function(e, data) {
                        var node = data.rslt.obj, loadedNodeID = self.find(":input[name=ID]").val(), origEvent = data.args[2], container = $(".cms-container");
                        if (!origEvent) {
                            return false;
                        }
                        if ($(node).hasClass("disabled")) return false;
                        if ($(node).data("id") == loadedNodeID) return;
                        var url = $(node).find("a:first").attr("href");
                        if (url && url != "#") {
                            url = url.split("?")[0];
                            self.jstree("deselect_all");
                            self.jstree("uncheck_all");
                            if ($.path.isExternal($(node).find("a:first"))) url = url = $.path.makeUrlAbsolute(url, $("base").attr("href"));
                            if (document.location.search) url = $.path.addSearchParams(url, document.location.search.replace(/^\?/, ""));
                            container.loadPanel(url);
                        } else {
                            self.removeForm();
                        }
                    });
                }
            });
            $(".cms-content .cms-content-fields").entwine({
                redraw: function redraw() {
                    if (window.debug) console.log("redraw", this.attr("class"), this.get(0));
                }
            });
            $(".cms-content .cms-content-header, .cms-content .cms-content-actions").entwine({
                redraw: function redraw() {
                    if (window.debug) console.log("redraw", this.attr("class"), this.get(0));
                    this.height("auto");
                    this.height(this.innerHeight() - this.css("padding-top") - this.css("padding-bottom"));
                }
            });
        });
    }, {
        jQuery: "jQuery"
    } ],
    6: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        var _i18n = require("i18n");
        var _i18n2 = _interopRequireDefault(_i18n);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        window.onbeforeunload = function(e) {
            var form = (0, _jQuery2.default)(".cms-edit-form");
            form.trigger("beforesubmitform");
            if (form.is(".changed") && !form.is(".discardchanges")) {
                return _i18n2.default._t("LeftAndMain.CONFIRMUNSAVEDSHORT");
            }
        };
        _jQuery2.default.entwine("ss", function($) {
            $(".cms-edit-form").entwine({
                PlaceholderHtml: "",
                ChangeTrackerOptions: {
                    ignoreFieldSelector: ".no-change-track, .ss-upload :input, .cms-navigator :input"
                },
                ValidationErrorShown: false,
                onadd: function onadd() {
                    var self = this;
                    this.attr("autocomplete", "off");
                    this._setupChangeTracker();
                    for (var overrideAttr in {
                        action: true,
                        method: true,
                        enctype: true,
                        name: true
                    }) {
                        var el = this.find(":input[name=" + "_form_" + overrideAttr + "]");
                        if (el) {
                            this.attr(overrideAttr, el.val());
                            el.remove();
                        }
                    }
                    this.setValidationErrorShown(false);
                    this._super();
                },
                "from .cms-tabset": {
                    onafterredrawtabs: function onafterredrawtabs() {
                        if (this.hasClass("validationerror")) {
                            var tabError = this.find(".message.validation, .message.required").first().closest(".tab");
                            $(".cms-container").clearCurrentTabState();
                            var $tabSet = tabError.closest(".ss-tabset");
                            if (!$tabSet.length) {
                                $tabSet = tabError.closest(".cms-tabset");
                            }
                            if ($tabSet.length) {
                                $tabSet.tabs("option", "active", tabError.index(".tab"));
                            } else if (!this.getValidationErrorShown()) {
                                this.setValidationErrorShown(true);
                                errorMessage(ss.i18n._t("ModelAdmin.VALIDATIONERROR", "Validation Error"));
                            }
                        }
                    }
                },
                onremove: function onremove() {
                    this.changetracker("destroy");
                    this._super();
                },
                onmatch: function onmatch() {
                    this._super();
                },
                onunmatch: function onunmatch() {
                    this._super();
                },
                redraw: function redraw() {
                    if (window.debug) console.log("redraw", this.attr("class"), this.get(0));
                    this.add(this.find(".cms-tabset")).redrawTabs();
                    this.find(".cms-content-header").redraw();
                },
                _setupChangeTracker: function _setupChangeTracker() {
                    this.changetracker(this.getChangeTrackerOptions());
                },
                confirmUnsavedChanges: function confirmUnsavedChanges() {
                    this.trigger("beforesubmitform");
                    if (!this.is(".changed") || this.is(".discardchanges")) {
                        return true;
                    }
                    var confirmed = confirm(_i18n2.default._t("LeftAndMain.CONFIRMUNSAVED"));
                    if (confirmed) {
                        this.addClass("discardchanges");
                    }
                    return confirmed;
                },
                onsubmit: function onsubmit(e, button) {
                    if (this.prop("target") != "_blank") {
                        if (button) this.closest(".cms-container").submitForm(this, button);
                        return false;
                    }
                },
                validate: function validate() {
                    var isValid = true;
                    this.trigger("validate", {
                        isValid: isValid
                    });
                    return isValid;
                },
                "from .htmleditor": {
                    oneditorinit: function oneditorinit(e) {
                        var self = this, field = $(e.target).closest(".field.htmleditor"), editor = field.find("textarea.htmleditor").getEditor().getInstance();
                        editor.onClick.add(function(e) {
                            self.saveFieldFocus(field.attr("id"));
                        });
                    }
                },
                "from .cms-edit-form :input:not(:submit)": {
                    onclick: function onclick(e) {
                        this.saveFieldFocus($(e.target).attr("id"));
                    },
                    onfocus: function onfocus(e) {
                        this.saveFieldFocus($(e.target).attr("id"));
                    }
                },
                "from .cms-edit-form .treedropdown *": {
                    onfocusin: function onfocusin(e) {
                        var field = $(e.target).closest(".field.treedropdown");
                        this.saveFieldFocus(field.attr("id"));
                    }
                },
                "from .cms-edit-form .dropdown .chosen-container a": {
                    onfocusin: function onfocusin(e) {
                        var field = $(e.target).closest(".field.dropdown");
                        this.saveFieldFocus(field.attr("id"));
                    }
                },
                "from .cms-container": {
                    ontabstaterestored: function ontabstaterestored(e) {
                        this.restoreFieldFocus();
                    }
                },
                saveFieldFocus: function saveFieldFocus(selected) {
                    if (typeof window.sessionStorage == "undefined" || window.sessionStorage === null) return;
                    var id = $(this).attr("id"), focusElements = [];
                    focusElements.push({
                        id: id,
                        selected: selected
                    });
                    if (focusElements) {
                        try {
                            window.sessionStorage.setItem(id, JSON.stringify(focusElements));
                        } catch (err) {
                            if (err.code === DOMException.QUOTA_EXCEEDED_ERR && window.sessionStorage.length === 0) {
                                return;
                            } else {
                                throw err;
                            }
                        }
                    }
                },
                restoreFieldFocus: function restoreFieldFocus() {
                    if (typeof window.sessionStorage == "undefined" || window.sessionStorage === null) return;
                    var self = this, hasSessionStorage = typeof window.sessionStorage !== "undefined" && window.sessionStorage, sessionData = hasSessionStorage ? window.sessionStorage.getItem(this.attr("id")) : null, sessionStates = sessionData ? JSON.parse(sessionData) : false, elementID, tabbed = this.find(".ss-tabset").length !== 0, activeTab, elementTab, toggleComposite, scrollY;
                    if (hasSessionStorage && sessionStates.length > 0) {
                        $.each(sessionStates, function(i, sessionState) {
                            if (self.is("#" + sessionState.id)) {
                                elementID = $("#" + sessionState.selected);
                            }
                        });
                        if ($(elementID).length < 1) {
                            this.focusFirstInput();
                            return;
                        }
                        activeTab = $(elementID).closest(".ss-tabset").find(".ui-tabs-nav .ui-tabs-active .ui-tabs-anchor").attr("id");
                        elementTab = "tab-" + $(elementID).closest(".ss-tabset .ui-tabs-panel").attr("id");
                        if (tabbed && elementTab !== activeTab) {
                            return;
                        }
                        toggleComposite = $(elementID).closest(".togglecomposite");
                        if (toggleComposite.length > 0) {
                            toggleComposite.accordion("activate", toggleComposite.find(".ui-accordion-header"));
                        }
                        scrollY = $(elementID).position().top;
                        if (!$(elementID).is(":visible")) {
                            elementID = "#" + $(elementID).closest(".field").attr("id");
                            scrollY = $(elementID).position().top;
                        }
                        $(elementID).focus();
                        if (scrollY > $(window).height() / 2) {
                            self.find(".cms-content-fields").scrollTop(scrollY);
                        }
                    } else {
                        this.focusFirstInput();
                    }
                },
                focusFirstInput: function focusFirstInput() {
                    this.find(':input:not(:submit)[data-skip-autofocus!="true"]').filter(":visible:first").focus();
                }
            });
            $(".cms-edit-form .btn-toolbar input.action[type=submit], .cms-edit-form .btn-toolbar button.action").entwine({
                onclick: function onclick(e) {
                    if (this.hasClass("gridfield-button-delete") && !confirm(_i18n2.default._t("TABLEFIELD.DELETECONFIRMMESSAGE"))) {
                        e.preventDefault();
                        return false;
                    }
                    if (!this.is(":disabled")) {
                        this.parents("form").trigger("submit", [ this ]);
                    }
                    e.preventDefault();
                    return false;
                }
            });
            $(".cms-edit-form .btn-toolbar input.action[type=submit].ss-ui-action-cancel, .cms-edit-form .btn-toolbar button.action.ss-ui-action-cancel").entwine({
                onclick: function onclick(e) {
                    if (window.history.length > 1) {
                        window.history.back();
                    } else {
                        this.parents("form").trigger("submit", [ this ]);
                    }
                    e.preventDefault();
                }
            });
            $(".cms-edit-form .ss-tabset").entwine({
                onmatch: function onmatch() {
                    if (!this.hasClass("ss-ui-action-tabset")) {
                        var tabs = this.find("> ul:first");
                        if (tabs.children("li").length == 1) {
                            tabs.hide().parent().addClass("ss-tabset-tabshidden");
                        }
                    }
                    this._super();
                },
                onunmatch: function onunmatch() {
                    this._super();
                }
            });
        });
    }, {
        i18n: "i18n",
        jQuery: "jQuery"
    } ],
    7: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        _jQuery2.default.entwine("ss", function($) {
            $(".cms-description-toggle").entwine({
                onadd: function onadd() {
                    var shown = false, fieldId = this.prop("id").substr(0, this.prop("id").indexOf("_Holder")), $trigger = this.find(".cms-description-trigger"), $description = this.find(".description");
                    if (this.hasClass("description-toggle-enabled")) {
                        return;
                    }
                    if ($trigger.length === 0) {
                        $trigger = this.find(".middleColumn").first().after('<label class="right" for="' + fieldId + '"><a class="cms-description-trigger" href="javascript:void(0)"><span class="btn-icon-information"></span></a></label>').next();
                    }
                    this.addClass("description-toggle-enabled");
                    $trigger.on("click", function() {
                        $description[shown ? "hide" : "show"]();
                        shown = !shown;
                    });
                    $description.hide();
                }
            });
        });
    }, {
        jQuery: "jQuery"
    } ],
    8: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        _jQuery2.default.entwine("ss", function($) {
            $(".cms .field.cms-description-tooltip").entwine({
                onmatch: function onmatch() {
                    this._super();
                    var descriptionEl = this.find(".description"), inputEl, tooltipEl;
                    if (descriptionEl.length) {
                        this.attr("title", descriptionEl.text()).tooltip({
                            content: descriptionEl.html()
                        });
                        descriptionEl.remove();
                    }
                }
            });
            $(".cms .field.cms-description-tooltip :input").entwine({
                onfocusin: function onfocusin(e) {
                    this.closest(".field").tooltip("open");
                },
                onfocusout: function onfocusout(e) {
                    this.closest(".field").tooltip("close");
                }
            });
        });
    }, {
        jQuery: "jQuery"
    } ],
    9: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        _jQuery2.default.fn.layout.defaults.resize = false;
        jLayout = typeof jLayout === "undefined" ? {} : jLayout;
        jLayout.threeColumnCompressor = function(spec, options) {
            if (typeof spec.menu === "undefined" || typeof spec.content === "undefined" || typeof spec.preview === "undefined") {
                throw 'Spec is invalid. Please provide "menu", "content" and "preview" elements.';
            }
            if (typeof options.minContentWidth === "undefined" || typeof options.minPreviewWidth === "undefined" || typeof options.mode === "undefined") {
                throw 'Spec is invalid. Please provide "minContentWidth", "minPreviewWidth", "mode"';
            }
            if (options.mode !== "split" && options.mode !== "content" && options.mode !== "preview") {
                throw 'Spec is invalid. "mode" should be either "split", "content" or "preview"';
            }
            var obj = {
                options: options
            };
            var menu = _jQuery2.default.jLayoutWrap(spec.menu), content = _jQuery2.default.jLayoutWrap(spec.content), preview = _jQuery2.default.jLayoutWrap(spec.preview);
            obj.layout = function(container) {
                var size = container.bounds(), insets = container.insets(), top = insets.top, bottom = size.height - insets.bottom, left = insets.left, right = size.width - insets.right;
                var menuWidth = spec.menu.width(), contentWidth = 0, previewWidth = 0;
                if (this.options.mode === "preview") {
                    contentWidth = 0;
                    previewWidth = right - left - menuWidth;
                } else if (this.options.mode === "content") {
                    contentWidth = right - left - menuWidth;
                    previewWidth = 0;
                } else {
                    contentWidth = (right - left - menuWidth) / 2;
                    previewWidth = right - left - (menuWidth + contentWidth);
                    if (contentWidth < this.options.minContentWidth) {
                        contentWidth = this.options.minContentWidth;
                        previewWidth = right - left - (menuWidth + contentWidth);
                    } else if (previewWidth < this.options.minPreviewWidth) {
                        previewWidth = this.options.minPreviewWidth;
                        contentWidth = right - left - (menuWidth + previewWidth);
                    }
                    if (contentWidth < this.options.minContentWidth || previewWidth < this.options.minPreviewWidth) {
                        contentWidth = right - left - menuWidth;
                        previewWidth = 0;
                    }
                }
                var prehidden = {
                    content: spec.content.hasClass("column-hidden"),
                    preview: spec.preview.hasClass("column-hidden")
                };
                var posthidden = {
                    content: contentWidth === 0,
                    preview: previewWidth === 0
                };
                spec.content.toggleClass("column-hidden", posthidden.content);
                spec.preview.toggleClass("column-hidden", posthidden.preview);
                menu.bounds({
                    x: left,
                    y: top,
                    height: bottom - top,
                    width: menuWidth
                });
                menu.doLayout();
                left += menuWidth;
                content.bounds({
                    x: left,
                    y: top,
                    height: bottom - top,
                    width: contentWidth
                });
                if (!posthidden.content) content.doLayout();
                left += contentWidth;
                preview.bounds({
                    x: left,
                    y: top,
                    height: bottom - top,
                    width: previewWidth
                });
                if (!posthidden.preview) preview.doLayout();
                if (posthidden.content !== prehidden.content) spec.content.trigger("columnvisibilitychanged");
                if (posthidden.preview !== prehidden.preview) spec.preview.trigger("columnvisibilitychanged");
                if (contentWidth + previewWidth < options.minContentWidth + options.minPreviewWidth) {
                    spec.preview.trigger("disable");
                } else {
                    spec.preview.trigger("enable");
                }
                return container;
            };
            function typeLayout(type) {
                var func = type + "Size";
                return function(container) {
                    var menuSize = menu[func](), contentSize = content[func](), previewSize = preview[func](), insets = container.insets();
                    width = menuSize.width + contentSize.width + previewSize.width;
                    height = Math.max(menuSize.height, contentSize.height, previewSize.height);
                    return {
                        width: insets.left + insets.right + width,
                        height: insets.top + insets.bottom + height
                    };
                };
            }
            obj.preferred = typeLayout("preferred");
            obj.minimum = typeLayout("minimum");
            obj.maximum = typeLayout("maximum");
            return obj;
        };
    }, {
        jQuery: "jQuery"
    } ],
    10: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        _jQuery2.default.entwine("ss", function($) {
            $(".cms-panel.cms-menu").entwine({
                togglePanel: function togglePanel(doExpand, silent, doSaveState) {
                    $(".cms-menu-list").children("li").each(function() {
                        if (doExpand) {
                            $(this).children("ul").each(function() {
                                $(this).removeClass("collapsed-flyout");
                                if ($(this).data("collapse")) {
                                    $(this).removeData("collapse");
                                    $(this).addClass("collapse");
                                }
                            });
                        } else {
                            $(this).children("ul").each(function() {
                                $(this).addClass("collapsed-flyout");
                                $(this).hasClass("collapse");
                                $(this).removeClass("collapse");
                                $(this).data("collapse", true);
                            });
                        }
                    });
                    this.toggleFlyoutState(doExpand);
                    this._super(doExpand, silent, doSaveState);
                },
                toggleFlyoutState: function toggleFlyoutState(bool) {
                    if (bool) {
                        $(".collapsed").find("li").show();
                        $(".cms-menu-list").find(".child-flyout-indicator").hide();
                    } else {
                        $(".collapsed-flyout").find("li").each(function() {
                            $(this).hide();
                        });
                        var par = $(".cms-menu-list ul.collapsed-flyout").parent();
                        if (par.children(".child-flyout-indicator").length === 0) par.append('<span class="child-flyout-indicator"></span>').fadeIn();
                        par.children(".child-flyout-indicator").fadeIn();
                    }
                },
                siteTreePresent: function siteTreePresent() {
                    return $("#cms-content-tools-CMSMain").length > 0;
                },
                getPersistedStickyState: function getPersistedStickyState() {
                    var persistedState, cookieValue;
                    if ($.cookie !== void 0) {
                        cookieValue = $.cookie("cms-menu-sticky");
                        if (cookieValue !== void 0 && cookieValue !== null) {
                            persistedState = cookieValue === "true";
                        }
                    }
                    return persistedState;
                },
                setPersistedStickyState: function setPersistedStickyState(isSticky) {
                    if ($.cookie !== void 0) {
                        $.cookie("cms-menu-sticky", isSticky, {
                            path: "/",
                            expires: 31
                        });
                    }
                },
                getEvaluatedCollapsedState: function getEvaluatedCollapsedState() {
                    var shouldCollapse, manualState = this.getPersistedCollapsedState(), menuIsSticky = $(".cms-menu").getPersistedStickyState(), automaticState = this.siteTreePresent();
                    if (manualState === void 0) {
                        shouldCollapse = automaticState;
                    } else if (manualState !== automaticState && menuIsSticky) {
                        shouldCollapse = manualState;
                    } else {
                        shouldCollapse = automaticState;
                    }
                    return shouldCollapse;
                },
                onadd: function onadd() {
                    var self = this;
                    setTimeout(function() {
                        self.togglePanel(!self.getEvaluatedCollapsedState(), false, false);
                    }, 0);
                    $(window).on("ajaxComplete", function(e) {
                        setTimeout(function() {
                            self.togglePanel(!self.getEvaluatedCollapsedState(), false, false);
                        }, 0);
                    });
                    this._super();
                }
            });
            $(".cms-menu-list").entwine({
                onmatch: function onmatch() {
                    var self = this;
                    this.find("li.current").select();
                    this.updateItems();
                    this._super();
                },
                onunmatch: function onunmatch() {
                    this._super();
                },
                updateMenuFromResponse: function updateMenuFromResponse(xhr) {
                    var controller = xhr.getResponseHeader("X-Controller");
                    if (controller) {
                        var item = this.find("li#Menu-" + controller.replace(/\\/g, "-").replace(/[^a-zA-Z0-9\-_:.]+/, ""));
                        if (!item.hasClass("current")) item.select();
                    }
                    this.updateItems();
                },
                "from .cms-container": {
                    onafterstatechange: function onafterstatechange(e, data) {
                        this.updateMenuFromResponse(data.xhr);
                    },
                    onaftersubmitform: function onaftersubmitform(e, data) {
                        this.updateMenuFromResponse(data.xhr);
                    }
                },
                "from .cms-edit-form": {
                    onrelodeditform: function onrelodeditform(e, data) {
                        this.updateMenuFromResponse(data.xmlhttp);
                    }
                },
                getContainingPanel: function getContainingPanel() {
                    return this.closest(".cms-panel");
                },
                fromContainingPanel: {
                    ontoggle: function ontoggle(e) {
                        this.toggleClass("collapsed", $(e.target).hasClass("collapsed"));
                        $(".cms-container").trigger("windowresize");
                        if (this.hasClass("collapsed")) this.find("li.children.opened").removeClass("opened");
                        if (!this.hasClass("collapsed")) {
                            $(".toggle-children.opened").closest("li").addClass("opened");
                        }
                    }
                },
                updateItems: function updateItems() {
                    var editPageItem = this.find("#Menu-CMSMain");
                    editPageItem[editPageItem.is(".current") ? "show" : "hide"]();
                    var currentID = $(".cms-content input[name=ID]").val();
                    if (currentID) {
                        this.find("li").each(function() {
                            if ($.isFunction($(this).setRecordID)) $(this).setRecordID(currentID);
                        });
                    }
                }
            });
            $(".cms-menu-list li").entwine({
                toggleFlyout: function toggleFlyout(bool) {
                    var fly = $(this);
                    if (fly.children("ul").first().hasClass("collapsed-flyout")) {
                        if (bool) {
                            if (!fly.children("ul").first().children("li").first().hasClass("clone")) {
                                var li = fly.clone();
                                li.addClass("clone").css({});
                                li.children("ul").first().remove();
                                li.find("span").not(".text").remove();
                                li.find("a").first().unbind("click");
                                fly.children("ul").prepend(li);
                            }
                            $(".collapsed-flyout").show();
                            fly.addClass("opened");
                            fly.children("ul").find("li").fadeIn("fast");
                        } else {
                            if (li) {
                                li.remove();
                            }
                            $(".collapsed-flyout").hide();
                            fly.removeClass("opened");
                            fly.find("toggle-children").removeClass("opened");
                            fly.children("ul").find("li").hide();
                        }
                    }
                }
            });
            $(".cms-menu-list li").hoverIntent(function() {
                $(this).toggleFlyout(true);
            }, function() {
                $(this).toggleFlyout(false);
            });
            $(".cms-menu-list .toggle").entwine({
                onclick: function onclick(e) {
                    e.preventDefault();
                    $(this).toogleFlyout(true);
                }
            });
            $(".cms-menu-list li").entwine({
                onmatch: function onmatch() {
                    if (this.find("ul").length) {
                        this.find("a:first").append('<span class="toggle-children"><span class="toggle-children-icon"></span></span>');
                    }
                    this._super();
                },
                onunmatch: function onunmatch() {
                    this._super();
                },
                toggle: function toggle() {
                    this[this.hasClass("opened") ? "close" : "open"]();
                },
                open: function open() {
                    var parent = this.getMenuItem();
                    if (parent) parent.open();
                    if (this.find("li.clone")) {
                        this.find("li.clone").remove();
                    }
                    this.addClass("opened").find("ul").show();
                    this.find(".toggle-children").addClass("opened");
                },
                close: function close() {
                    this.removeClass("opened").find("ul").hide();
                    this.find(".toggle-children").removeClass("opened");
                },
                select: function select() {
                    var parent = this.getMenuItem();
                    this.addClass("current").open();
                    this.siblings().removeClass("current").close();
                    this.siblings().find("li").removeClass("current");
                    if (parent) {
                        var parentSiblings = parent.siblings();
                        parent.addClass("current");
                        parentSiblings.removeClass("current").close();
                        parentSiblings.find("li").removeClass("current").close();
                    }
                    this.getMenu().updateItems();
                    this.trigger("select");
                }
            });
            $(".cms-menu-list *").entwine({
                getMenu: function getMenu() {
                    return this.parents(".cms-menu-list:first");
                }
            });
            $(".cms-menu-list li *").entwine({
                getMenuItem: function getMenuItem() {
                    return this.parents("li:first");
                }
            });
            $(".cms-menu-list li a").entwine({
                onclick: function onclick(e) {
                    var isExternal = $.path.isExternal(this.attr("href"));
                    if (e.which > 1 || isExternal) return;
                    if (this.attr("target") == "_blank") {
                        return;
                    }
                    e.preventDefault();
                    var item = this.getMenuItem();
                    var url = this.attr("href");
                    if (!isExternal) url = $("base").attr("href") + url;
                    var children = item.find("li");
                    if (children.length) {
                        children.first().find("a").click();
                    } else {
                        if (!$(".cms-container").loadPanel(url)) return false;
                    }
                    item.select();
                }
            });
            $(".cms-menu-list li .toggle-children").entwine({
                onclick: function onclick(e) {
                    var li = this.closest("li");
                    li.toggle();
                    return false;
                }
            });
            $(".cms .profile-link").entwine({
                onclick: function onclick() {
                    $(".cms-container").loadPanel(this.attr("href"));
                    $(".cms-menu-list li").removeClass("current").close();
                    return false;
                }
            });
            $(".cms-menu .sticky-toggle").entwine({
                onadd: function onadd() {
                    var isSticky = $(".cms-menu").getPersistedStickyState() ? true : false;
                    this.toggleCSS(isSticky);
                    this.toggleIndicator(isSticky);
                    this._super();
                },
                toggleCSS: function toggleCSS(isSticky) {
                    this[isSticky ? "addClass" : "removeClass"]("active");
                },
                toggleIndicator: function toggleIndicator(isSticky) {
                    this.next(".sticky-status-indicator").text(isSticky ? "fixed" : "auto");
                },
                onclick: function onclick() {
                    var $menu = this.closest(".cms-menu"), persistedCollapsedState = $menu.getPersistedCollapsedState(), persistedStickyState = $menu.getPersistedStickyState(), newStickyState = persistedStickyState === void 0 ? !this.hasClass("active") : !persistedStickyState;
                    if (persistedCollapsedState === void 0) {
                        $menu.setPersistedCollapsedState($menu.hasClass("collapsed"));
                    } else if (persistedCollapsedState !== void 0 && newStickyState === false) {
                        $menu.clearPersistedCollapsedState();
                    }
                    $menu.setPersistedStickyState(newStickyState);
                    this.toggleCSS(newStickyState);
                    this.toggleIndicator(newStickyState);
                    this._super();
                }
            });
        });
    }, {
        jQuery: "jQuery"
    } ],
    11: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        _jQuery2.default.entwine("ss", function($) {
            $.entwine.warningLevel = $.entwine.WARN_LEVEL_BESTPRACTISE;
            $(".cms-panel").entwine({
                WidthExpanded: null,
                WidthCollapsed: null,
                canSetCookie: function canSetCookie() {
                    return $.cookie !== void 0 && this.attr("id") !== void 0;
                },
                getPersistedCollapsedState: function getPersistedCollapsedState() {
                    var isCollapsed, cookieValue;
                    if (this.canSetCookie()) {
                        cookieValue = $.cookie("cms-panel-collapsed-" + this.attr("id"));
                        if (cookieValue !== void 0 && cookieValue !== null) {
                            isCollapsed = cookieValue === "true";
                        }
                    }
                    return isCollapsed;
                },
                setPersistedCollapsedState: function setPersistedCollapsedState(newState) {
                    if (this.canSetCookie()) {
                        $.cookie("cms-panel-collapsed-" + this.attr("id"), newState, {
                            path: "/",
                            expires: 31
                        });
                    }
                },
                clearPersistedCollapsedState: function clearPersistedCollapsedState() {
                    if (this.canSetCookie()) {
                        $.cookie("cms-panel-collapsed-" + this.attr("id"), "", {
                            path: "/",
                            expires: -1
                        });
                    }
                },
                getInitialCollapsedState: function getInitialCollapsedState() {
                    var isCollapsed = this.getPersistedCollapsedState();
                    if (isCollapsed === void 0) {
                        isCollapsed = this.hasClass("collapsed");
                    }
                    return isCollapsed;
                },
                onadd: function onadd() {
                    var collapsedContent, container;
                    if (!this.find(".cms-panel-content").length) throw new Exception('Content panel for ".cms-panel" not found');
                    if (!this.find(".cms-panel-toggle").length) {
                        container = $("<div class='cms-panel-toggle south'></div>").append('<a class="toggle-expand" href="#"><span>&raquo;</span></a>').append('<a class="toggle-collapse" href="#"><span>&laquo;</span></a>');
                        this.append(container);
                    }
                    this.setWidthExpanded(this.find(".cms-panel-content").innerWidth());
                    collapsedContent = this.find(".cms-panel-content-collapsed");
                    this.setWidthCollapsed(collapsedContent.length ? collapsedContent.innerWidth() : this.find(".toggle-expand").innerWidth());
                    this.togglePanel(!this.getInitialCollapsedState(), true, false);
                    this._super();
                },
                togglePanel: function togglePanel(doExpand, silent, doSaveState) {
                    var newWidth, collapsedContent;
                    if (!silent) {
                        this.trigger("beforetoggle.sspanel", doExpand);
                        this.trigger(doExpand ? "beforeexpand" : "beforecollapse");
                    }
                    this.toggleClass("collapsed", !doExpand);
                    newWidth = doExpand ? this.getWidthExpanded() : this.getWidthCollapsed();
                    this.width(newWidth);
                    collapsedContent = this.find(".cms-panel-content-collapsed");
                    if (collapsedContent.length) {
                        this.find(".cms-panel-content")[doExpand ? "show" : "hide"]();
                        this.find(".cms-panel-content-collapsed")[doExpand ? "hide" : "show"]();
                    }
                    if (doSaveState !== false) {
                        this.setPersistedCollapsedState(!doExpand);
                    }
                    this.trigger("toggle", doExpand);
                    this.trigger(doExpand ? "expand" : "collapse");
                },
                expandPanel: function expandPanel(force) {
                    if (!force && !this.hasClass("collapsed")) return;
                    this.togglePanel(true);
                },
                collapsePanel: function collapsePanel(force) {
                    if (!force && this.hasClass("collapsed")) return;
                    this.togglePanel(false);
                }
            });
            $(".cms-panel.collapsed .cms-panel-toggle").entwine({
                onclick: function onclick(e) {
                    this.expandPanel();
                    e.preventDefault();
                }
            });
            $(".cms-panel *").entwine({
                getPanel: function getPanel() {
                    return this.parents(".cms-panel:first");
                }
            });
            $(".cms-panel .toggle-expand").entwine({
                onclick: function onclick(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.getPanel().expandPanel();
                    this._super(e);
                }
            });
            $(".cms-panel .toggle-collapse").entwine({
                onclick: function onclick(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.getPanel().collapsePanel();
                    this._super(e);
                }
            });
            $(".cms-content-tools.collapsed").entwine({
                onclick: function onclick(e) {
                    this.expandPanel();
                    this._super(e);
                }
            });
        });
    }, {
        jQuery: "jQuery"
    } ],
    12: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        var _i18n = require("i18n");
        var _i18n2 = _interopRequireDefault(_i18n);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        _jQuery2.default.entwine("ss.preview", function($) {
            $(".cms-preview").entwine({
                AllowedStates: [ "StageLink", "LiveLink", "ArchiveLink" ],
                CurrentStateName: null,
                CurrentSizeName: "auto",
                IsPreviewEnabled: false,
                DefaultMode: "split",
                Sizes: {
                    auto: {
                        width: "100%",
                        height: "100%"
                    },
                    mobile: {
                        width: "335px",
                        height: "568px"
                    },
                    mobileLandscape: {
                        width: "583px",
                        height: "320px"
                    },
                    tablet: {
                        width: "783px",
                        height: "1024px"
                    },
                    tabletLandscape: {
                        width: "1039px",
                        height: "768px"
                    },
                    desktop: {
                        width: "1024px",
                        height: "800px"
                    }
                },
                changeState: function changeState(stateName, save) {
                    var self = this, states = this._getNavigatorStates();
                    if (save !== false) {
                        $.each(states, function(index, state) {
                            self.saveState("state", stateName);
                        });
                    }
                    this.setCurrentStateName(stateName);
                    this._loadCurrentState();
                    this.redraw();
                    return this;
                },
                changeMode: function changeMode(modeName, save) {
                    var container = $(".cms-container");
                    if (modeName == "split") {
                        container.entwine(".ss").splitViewMode();
                        this.setIsPreviewEnabled(true);
                        this._loadCurrentState();
                    } else if (modeName == "content") {
                        container.entwine(".ss").contentViewMode();
                        this.setIsPreviewEnabled(false);
                    } else if (modeName == "preview") {
                        container.entwine(".ss").previewMode();
                        this.setIsPreviewEnabled(true);
                        this._loadCurrentState();
                    } else {
                        throw "Invalid mode: " + modeName;
                    }
                    if (save !== false) this.saveState("mode", modeName);
                    this.redraw();
                    return this;
                },
                changeSize: function changeSize(sizeName) {
                    var sizes = this.getSizes();
                    this.setCurrentSizeName(sizeName);
                    this.removeClass("auto desktop tablet mobile").addClass(sizeName);
                    this.find(".preview-device-outer").width(sizes[sizeName].width).height(sizes[sizeName].height);
                    this.find(".preview-device-inner").width(sizes[sizeName].width);
                    this.saveState("size", sizeName);
                    this.redraw();
                    return this;
                },
                redraw: function redraw() {
                    if (window.debug) console.log("redraw", this.attr("class"), this.get(0));
                    var currentStateName = this.getCurrentStateName();
                    if (currentStateName) {
                        this.find(".cms-preview-states").changeVisibleState(currentStateName);
                    }
                    var layoutOptions = $(".cms-container").entwine(".ss").getLayoutOptions();
                    if (layoutOptions) {
                        $(".preview-mode-selector").changeVisibleMode(layoutOptions.mode);
                    }
                    var currentSizeName = this.getCurrentSizeName();
                    if (currentSizeName) {
                        this.find(".preview-size-selector").changeVisibleSize(this.getCurrentSizeName());
                    }
                    return this;
                },
                saveState: function saveState(name, value) {
                    if (this._supportsLocalStorage()) window.localStorage.setItem("cms-preview-state-" + name, value);
                },
                loadState: function loadState(name) {
                    if (this._supportsLocalStorage()) return window.localStorage.getItem("cms-preview-state-" + name);
                },
                disablePreview: function disablePreview() {
                    this.setPendingURL(null);
                    this._loadUrl("about:blank");
                    this._block();
                    this.changeMode("content", false);
                    this.setIsPreviewEnabled(false);
                    return this;
                },
                enablePreview: function enablePreview() {
                    if (!this.getIsPreviewEnabled()) {
                        this.setIsPreviewEnabled(true);
                        if ($.browser.msie && $.browser.version.slice(0, 3) <= 7) {
                            this.changeMode("content");
                        } else {
                            this.changeMode(this.getDefaultMode(), false);
                        }
                    }
                    return this;
                },
                getOrAppendFontFixStyleElement: function getOrAppendFontFixStyleElement() {
                    var style = $("#FontFixStyleElement");
                    if (!style.length) {
                        style = $('<style type="text/css" id="FontFixStyleElement" disabled="disabled">' + ":before,:after{content:none !important}" + "</style>").appendTo("head");
                    }
                    return style;
                },
                onadd: function onadd() {
                    var self = this, layoutContainer = this.parent(), iframe = this.find("iframe");
                    iframe.addClass("center");
                    iframe.bind("load", function() {
                        self._adjustIframeForPreview();
                        self._loadCurrentPage();
                        $(this).removeClass("loading");
                    });
                    if ($.browser.msie && 8 === parseInt($.browser.version, 10)) {
                        iframe.bind("readystatechange", function(e) {
                            if (iframe[0].readyState == "interactive") {
                                self.getOrAppendFontFixStyleElement().removeAttr("disabled");
                                setTimeout(function() {
                                    self.getOrAppendFontFixStyleElement().attr("disabled", "disabled");
                                }, 0);
                            }
                        });
                    }
                    this.append('<div class="cms-preview-overlay ui-widget-overlay-light"></div>');
                    this.find(".cms-preview-overlay").hide();
                    this.disablePreview();
                    this._super();
                },
                _supportsLocalStorage: function _supportsLocalStorage() {
                    var uid = new Date();
                    var storage;
                    var result;
                    try {
                        (storage = window.localStorage).setItem(uid, uid);
                        result = storage.getItem(uid) == uid;
                        storage.removeItem(uid);
                        return result && storage;
                    } catch (exception) {
                        console.warn("localStorge is not available due to current browser / system settings.");
                    }
                },
                onenable: function onenable() {
                    var $viewModeSelector = $(".preview-mode-selector");
                    $viewModeSelector.removeClass("split-disabled");
                    $viewModeSelector.find(".disabled-tooltip").hide();
                },
                ondisable: function ondisable() {
                    var $viewModeSelector = $(".preview-mode-selector");
                    $viewModeSelector.addClass("split-disabled");
                    $viewModeSelector.find(".disabled-tooltip").show();
                },
                _block: function _block() {
                    this.addClass("blocked");
                    this.find(".cms-preview-overlay").show();
                    return this;
                },
                _unblock: function _unblock() {
                    this.removeClass("blocked");
                    this.find(".cms-preview-overlay").hide();
                    return this;
                },
                _initialiseFromContent: function _initialiseFromContent() {
                    var mode, size;
                    if (!$(".cms-previewable").length) {
                        this.disablePreview();
                    } else {
                        mode = this.loadState("mode");
                        size = this.loadState("size");
                        this._moveNavigator();
                        if (!mode || mode != "content") {
                            this.enablePreview();
                            this._loadCurrentState();
                        }
                        this.redraw();
                        if (mode) this.changeMode(mode);
                        if (size) this.changeSize(size);
                    }
                    return this;
                },
                "from .cms-container": {
                    onafterstatechange: function onafterstatechange(e, data) {
                        if (data.xhr.getResponseHeader("X-ControllerURL")) return;
                        this._initialiseFromContent();
                    }
                },
                PendingURL: null,
                oncolumnvisibilitychanged: function oncolumnvisibilitychanged() {
                    var url = this.getPendingURL();
                    if (url && !this.is(".column-hidden")) {
                        this.setPendingURL(null);
                        this._loadUrl(url);
                        this._unblock();
                    }
                },
                "from .cms-container .cms-edit-form": {
                    onaftersubmitform: function onaftersubmitform() {
                        this._initialiseFromContent();
                    }
                },
                _loadUrl: function _loadUrl(url) {
                    this.find("iframe").addClass("loading").attr("src", url);
                    return this;
                },
                _getNavigatorStates: function _getNavigatorStates() {
                    var urlMap = $.map(this.getAllowedStates(), function(name) {
                        var stateLink = $(".cms-preview-states .state-name[data-name=" + name + "]");
                        if (stateLink.length) {
                            return {
                                name: name,
                                url: stateLink.attr("data-link"),
                                active: stateLink.is(":radio") ? stateLink.is(":checked") : stateLink.is(":selected")
                            };
                        } else {
                            return null;
                        }
                    });
                    return urlMap;
                },
                _loadCurrentState: function _loadCurrentState() {
                    if (!this.getIsPreviewEnabled()) return this;
                    var states = this._getNavigatorStates();
                    var currentStateName = this.getCurrentStateName();
                    var currentState = null;
                    if (states) {
                        currentState = $.grep(states, function(state, index) {
                            return currentStateName === state.name || !currentStateName && state.active;
                        });
                    }
                    var url = null;
                    if (currentState[0]) {
                        url = currentState[0].url;
                    } else if (states.length) {
                        this.setCurrentStateName(states[0].name);
                        url = states[0].url;
                    } else {
                        this.setCurrentStateName(null);
                    }
                    if (url) {
                        url += (url.indexOf("?") === -1 ? "?" : "&") + "CMSPreview=1";
                    }
                    if (this.is(".column-hidden")) {
                        this.setPendingURL(url);
                        this._loadUrl("about:blank");
                        this._block();
                    } else {
                        this.setPendingURL(null);
                        if (url) {
                            this._loadUrl(url);
                            this._unblock();
                        } else {
                            this._block();
                        }
                    }
                    return this;
                },
                _moveNavigator: function _moveNavigator() {
                    var previewEl = $(".cms-preview .cms-preview-controls");
                    var navigatorEl = $(".cms-edit-form .cms-navigator");
                    if (navigatorEl.length && previewEl.length) {
                        previewEl.html($(".cms-edit-form .cms-navigator").detach());
                    } else {
                        this._block();
                    }
                },
                _loadCurrentPage: function _loadCurrentPage() {
                    if (!this.getIsPreviewEnabled()) return;
                    var doc, containerEl = $(".cms-container");
                    try {
                        doc = this.find("iframe")[0].contentDocument;
                    } catch (e) {
                        console.warn("Unable to access iframe, possible https mis-match");
                    }
                    if (!doc) {
                        return;
                    }
                    var id = $(doc).find("meta[name=x-page-id]").attr("content");
                    var editLink = $(doc).find("meta[name=x-cms-edit-link]").attr("content");
                    var contentPanel = $(".cms-content");
                    if (id && contentPanel.find(":input[name=ID]").val() != id) {
                        $(".cms-container").entwine(".ss").loadPanel(editLink);
                    }
                },
                _adjustIframeForPreview: function _adjustIframeForPreview() {
                    var iframe = this.find("iframe")[0], doc;
                    if (!iframe) {
                        return;
                    }
                    try {
                        doc = iframe.contentDocument;
                    } catch (e) {
                        console.warn("Unable to access iframe, possible https mis-match");
                    }
                    if (!doc) {
                        return;
                    }
                    var links = doc.getElementsByTagName("A");
                    for (var i = 0; i < links.length; i++) {
                        var href = links[i].getAttribute("href");
                        if (!href) continue;
                        if (href.match(/^http:\/\//)) links[i].setAttribute("target", "_blank");
                    }
                    var navi = doc.getElementById("SilverStripeNavigator");
                    if (navi) navi.style.display = "none";
                    var naviMsg = doc.getElementById("SilverStripeNavigatorMessage");
                    if (naviMsg) naviMsg.style.display = "none";
                    this.trigger("afterIframeAdjustedForPreview", [ doc ]);
                }
            });
            $(".cms-edit-form").entwine({
                onadd: function onadd() {
                    this._super();
                    $(".cms-preview")._initialiseFromContent();
                }
            });
            $(".cms-preview-states").entwine({
                changeVisibleState: function changeVisibleState(state) {
                    this.find('input[data-name="' + state + '"]').prop("checked", true);
                }
            });
            $(".cms-preview-states .state-name").entwine({
                onclick: function onclick(e) {
                    this.parent().find(".active").removeClass("active");
                    this.next("label").addClass("active");
                    var targetStateName = $(this).attr("data-name");
                    $(".cms-preview").changeState(targetStateName);
                }
            });
            $(".preview-mode-selector").entwine({
                changeVisibleMode: function changeVisibleMode(mode) {
                    this.find("select").val(mode).trigger("chosen:updated")._addIcon();
                }
            });
            $(".preview-mode-selector select").entwine({
                onchange: function onchange(e) {
                    this._super(e);
                    e.preventDefault();
                    var targetStateName = $(this).val();
                    $(".cms-preview").changeMode(targetStateName);
                }
            });
            $(".cms-preview.column-hidden").entwine({
                onmatch: function onmatch() {
                    $("#preview-mode-dropdown-in-content").show();
                    if ($(".cms-preview .result-selected").hasClass("font-icon-columns")) {
                        statusMessage(_i18n2.default._t("LeftAndMain.DISABLESPLITVIEW", "Screen too small to show site preview in split mode"), "error");
                    }
                    this._super();
                },
                onunmatch: function onunmatch() {
                    $("#preview-mode-dropdown-in-content").hide();
                    this._super();
                }
            });
            $("#preview-mode-dropdown-in-content").entwine({
                onmatch: function onmatch() {
                    if ($(".cms-preview").is(".column-hidden")) {
                        this.show();
                    } else {
                        this.hide();
                    }
                    this._super();
                },
                onunmatch: function onunmatch() {
                    this._super();
                }
            });
            $(".preview-size-selector").entwine({
                changeVisibleSize: function changeVisibleSize(size) {
                    this.find("select").val(size).trigger("chosen:updated")._addIcon();
                }
            });
            $(".preview-size-selector select").entwine({
                onchange: function onchange(e) {
                    e.preventDefault();
                    var targetSizeName = $(this).val();
                    $(".cms-preview").changeSize(targetSizeName);
                }
            });
            $(".preview-selector select.preview-dropdown").entwine({
                "onchosen:ready": function onchosenReady() {
                    this._super();
                    this._addIcon();
                },
                _addIcon: function _addIcon() {
                    var selected = this.find(":selected");
                    var iconClass = selected.attr("data-icon");
                    var target = this.parent().find(".chosen-container a.chosen-single");
                    var oldIcon = target.attr("data-icon");
                    if (typeof oldIcon !== "undefined") {
                        target.removeClass(oldIcon);
                    }
                    target.addClass(iconClass);
                    target.attr("data-icon", iconClass);
                    return this;
                }
            });
            $(".preview-mode-selector .chosen-drop li:last-child").entwine({
                onmatch: function onmatch() {
                    if ($(".preview-mode-selector").hasClass("split-disabled")) {
                        this.parent().append('<div class="disabled-tooltip"></div>');
                    } else {
                        this.parent().append('<div class="disabled-tooltip" style="display: none;"></div>');
                    }
                }
            });
            $(".preview-device-outer").entwine({
                onclick: function onclick() {
                    this.toggleClass("rotate");
                }
            });
        });
    }, {
        i18n: "i18n",
        jQuery: "jQuery"
    } ],
    13: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        _jQuery2.default.entwine("ss.tree", function($) {
            $(".cms-tree").entwine({
                Hints: null,
                IsUpdatingTree: false,
                IsLoaded: false,
                onadd: function onadd() {
                    this._super();
                    if ($.isNumeric(this.data("jstree_instance_id"))) return;
                    var hints = this.attr("data-hints");
                    if (hints) this.setHints($.parseJSON(hints));
                    var self = this;
                    this.jstree(this.getTreeConfig()).bind("loaded.jstree", function(e, data) {
                        self.setIsLoaded(true);
                        data.inst._set_settings({
                            html_data: {
                                ajax: {
                                    url: self.data("urlTree"),
                                    data: function data(node) {
                                        var params = self.data("searchparams") || [];
                                        params = $.grep(params, function(n, i) {
                                            return n.name != "ID" && n.name != "value";
                                        });
                                        params.push({
                                            name: "ID",
                                            value: $(node).data("id") ? $(node).data("id") : 0
                                        });
                                        params.push({
                                            name: "ajax",
                                            value: 1
                                        });
                                        return params;
                                    }
                                }
                            }
                        });
                        self.updateFromEditForm();
                        self.css("visibility", "visible");
                        data.inst.hide_checkboxes();
                    }).bind("before.jstree", function(e, data) {
                        if (data.func == "start_drag") {
                            if (!self.hasClass("draggable") || self.hasClass("multiselect")) {
                                e.stopImmediatePropagation();
                                return false;
                            }
                        }
                        if ($.inArray(data.func, [ "check_node", "uncheck_node" ])) {
                            var node = $(data.args[0]).parents("li:first");
                            var allowedChildren = node.find("li:not(.disabled)");
                            if (node.hasClass("disabled") && allowedChildren == 0) {
                                e.stopImmediatePropagation();
                                return false;
                            }
                        }
                    }).bind("move_node.jstree", function(e, data) {
                        if (self.getIsUpdatingTree()) return;
                        var movedNode = data.rslt.o, newParentNode = data.rslt.np, oldParentNode = data.inst._get_parent(movedNode), newParentID = $(newParentNode).data("id") || 0, nodeID = $(movedNode).data("id");
                        var siblingIDs = $.map($(movedNode).siblings().andSelf(), function(el) {
                            return $(el).data("id");
                        });
                        $.ajax({
                            url: $.path.addSearchParams(self.data("urlSavetreenode"), self.data("extraParams")),
                            type: "POST",
                            data: {
                                ID: nodeID,
                                ParentID: newParentID,
                                SiblingIDs: siblingIDs
                            },
                            success: function success() {
                                if ($(".cms-edit-form :input[name=ID]").val() == nodeID) {
                                    $(".cms-edit-form :input[name=ParentID]").val(newParentID);
                                }
                                self.updateNodesFromServer([ nodeID ]);
                            },
                            statusCode: {
                                403: function _() {
                                    $.jstree.rollback(data.rlbk);
                                }
                            }
                        });
                    }).bind("select_node.jstree check_node.jstree uncheck_node.jstree", function(e, data) {
                        $(document).triggerHandler(e, data);
                    });
                },
                onremove: function onremove() {
                    this.jstree("destroy");
                    this._super();
                },
                "from .cms-container": {
                    onafterstatechange: function onafterstatechange(e) {
                        this.updateFromEditForm();
                    }
                },
                "from .cms-container form": {
                    onaftersubmitform: function onaftersubmitform(e) {
                        var id = $(".cms-edit-form :input[name=ID]").val();
                        this.updateNodesFromServer([ id ]);
                    }
                },
                getTreeConfig: function getTreeConfig() {
                    var self = this;
                    return {
                        core: {
                            initially_open: [ "record-0" ],
                            animation: 0,
                            html_titles: true
                        },
                        html_data: {},
                        ui: {
                            select_limit: 1,
                            initially_select: [ this.find(".current").attr("id") ]
                        },
                        crrm: {
                            move: {
                                check_move: function check_move(data) {
                                    var movedNode = $(data.o), newParent = $(data.np), isMovedOntoContainer = data.ot.get_container()[0] == data.np[0], movedNodeClass = movedNode.getClassname(), newParentClass = newParent.getClassname(), hints = self.getHints(), disallowedChildren = [], hintKey = newParentClass ? newParentClass : "Root", hint = hints && typeof hints[hintKey] != "undefined" ? hints[hintKey] : null;
                                    if (hint && movedNode.attr("class").match(/VirtualPage-([^\s]*)/)) movedNodeClass = RegExp.$1;
                                    if (hint) disallowedChildren = typeof hint.disallowedChildren != "undefined" ? hint.disallowedChildren : [];
                                    var isAllowed = movedNode.data("id") !== 0 && !movedNode.hasClass("status-archived") && (!isMovedOntoContainer || data.p == "inside") && !newParent.hasClass("nochildren") && (!disallowedChildren.length || $.inArray(movedNodeClass, disallowedChildren) == -1);
                                    return isAllowed;
                                }
                            }
                        },
                        dnd: {
                            drop_target: false,
                            drag_target: false
                        },
                        checkbox: {
                            two_state: true
                        },
                        themes: {
                            theme: "apple",
                            url: $("body").data("frameworkpath") + "/thirdparty/jstree/themes/apple/style.css"
                        },
                        plugins: [ "html_data", "ui", "dnd", "crrm", "themes", "checkbox" ]
                    };
                },
                search: function search(params, callback) {
                    if (params) this.data("searchparams", params); else this.removeData("searchparams");
                    this.jstree("refresh", -1, callback);
                },
                getNodeByID: function getNodeByID(id) {
                    return this.find("*[data-id=" + id + "]");
                },
                createNode: function createNode(html, data, callback) {
                    var self = this, parentNode = data.ParentID !== void 0 ? self.getNodeByID(data.ParentID) : false, newNode = $(html);
                    var properties = {
                        data: ""
                    };
                    if (newNode.hasClass("jstree-open")) {
                        properties.state = "open";
                    } else if (newNode.hasClass("jstree-closed")) {
                        properties.state = "closed";
                    }
                    this.jstree("create_node", parentNode.length ? parentNode : -1, "last", properties, function(node) {
                        var origClasses = node.attr("class");
                        for (var i = 0; i < newNode[0].attributes.length; i++) {
                            var attr = newNode[0].attributes[i];
                            node.attr(attr.name, attr.value);
                        }
                        node.addClass(origClasses).html(newNode.html());
                        callback(node);
                    });
                },
                updateNode: function updateNode(node, html, data) {
                    var self = this, newNode = $(html), origClasses = node.attr("class");
                    var nextNode = data.NextID ? this.getNodeByID(data.NextID) : false;
                    var prevNode = data.PrevID ? this.getNodeByID(data.PrevID) : false;
                    var parentNode = data.ParentID ? this.getNodeByID(data.ParentID) : false;
                    $.each([ "id", "style", "class", "data-pagetype" ], function(i, attrName) {
                        node.attr(attrName, newNode.attr(attrName));
                    });
                    origClasses = origClasses.replace(/status-[^\s]*/, "");
                    var origChildren = node.children("ul").detach();
                    node.addClass(origClasses).html(newNode.html()).append(origChildren);
                    if (nextNode && nextNode.length) {
                        this.jstree("move_node", node, nextNode, "before");
                    } else if (prevNode && prevNode.length) {
                        this.jstree("move_node", node, prevNode, "after");
                    } else {
                        this.jstree("move_node", node, parentNode.length ? parentNode : -1);
                    }
                },
                updateFromEditForm: function updateFromEditForm() {
                    var node, id = $(".cms-edit-form :input[name=ID]").val();
                    if (id) {
                        node = this.getNodeByID(id);
                        if (node.length) {
                            this.jstree("deselect_all");
                            this.jstree("select_node", node);
                        } else {
                            this.updateNodesFromServer([ id ]);
                        }
                    } else {
                        this.jstree("deselect_all");
                    }
                },
                updateNodesFromServer: function updateNodesFromServer(ids) {
                    if (this.getIsUpdatingTree() || !this.getIsLoaded()) return;
                    var self = this, i, includesNewNode = false;
                    this.setIsUpdatingTree(true);
                    self.jstree("save_selected");
                    var correctStateFn = function correctStateFn(node) {
                        self.getNodeByID(node.data("id")).not(node).remove();
                        self.jstree("deselect_all");
                        self.jstree("select_node", node);
                    };
                    self.jstree("open_node", this.getNodeByID(0));
                    self.jstree("save_opened");
                    self.jstree("save_selected");
                    $.ajax({
                        url: $.path.addSearchParams(this.data("urlUpdatetreenodes"), "ids=" + ids.join(",")),
                        dataType: "json",
                        success: function success(data, xhr) {
                            $.each(data, function(nodeId, nodeData) {
                                var node = self.getNodeByID(nodeId);
                                if (!nodeData) {
                                    self.jstree("delete_node", node);
                                    return;
                                }
                                if (node.length) {
                                    self.updateNode(node, nodeData.html, nodeData);
                                    setTimeout(function() {
                                        correctStateFn(node);
                                    }, 500);
                                } else {
                                    includesNewNode = true;
                                    if (nodeData.ParentID && !self.find("li[data-id=" + nodeData.ParentID + "]").length) {
                                        self.jstree("load_node", -1, function() {
                                            newNode = self.find("li[data-id=" + nodeId + "]");
                                            correctStateFn(newNode);
                                        });
                                    } else {
                                        self.createNode(nodeData.html, nodeData, function(newNode) {
                                            correctStateFn(newNode);
                                        });
                                    }
                                }
                            });
                            if (!includesNewNode) {
                                self.jstree("deselect_all");
                                self.jstree("reselect");
                                self.jstree("reopen");
                            }
                        },
                        complete: function complete() {
                            self.setIsUpdatingTree(false);
                        }
                    });
                }
            });
            $(".cms-tree.multiple").entwine({
                onmatch: function onmatch() {
                    this._super();
                    this.jstree("show_checkboxes");
                },
                onunmatch: function onunmatch() {
                    this._super();
                    this.jstree("uncheck_all");
                    this.jstree("hide_checkboxes");
                },
                getSelectedIDs: function getSelectedIDs() {
                    return $(this).jstree("get_checked").not(".disabled").map(function() {
                        return $(this).data("id");
                    }).get();
                }
            });
            $(".cms-tree li").entwine({
                setEnabled: function setEnabled(bool) {
                    this.toggleClass("disabled", !bool);
                },
                getClassname: function getClassname() {
                    var matches = this.attr("class").match(/class-([^\s]*)/i);
                    return matches ? matches[1] : "";
                },
                getID: function getID() {
                    return this.data("id");
                }
            });
        });
    }, {
        jQuery: "jQuery"
    } ],
    14: [ function(require, module, exports) {
        "use strict";
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        _jQuery2.default.entwine("ss", function($) {
            $(".TreeDropdownField").entwine({
                "from .cms-container form": {
                    onaftersubmitform: function onaftersubmitform(e) {
                        this.find(".tree-holder").empty();
                        this._super();
                    }
                }
            });
        });
    }, {
        jQuery: "jQuery"
    } ],
    15: [ function(require, module, exports) {
        "use strict";
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
        };
        var _jQuery = require("jQuery");
        var _jQuery2 = _interopRequireDefault(_jQuery);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var windowWidth, windowHeight;
        _jQuery2.default.noConflict();
        window.ss = window.ss || {};
        window.ss.debounce = function(func, wait, immediate) {
            var timeout, context, args;
            var later = function later() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            return function() {
                var callNow = immediate && !timeout;
                context = this;
                args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) {
                    func.apply(context, args);
                }
            };
        };
        (0, _jQuery2.default)(window).bind("resize.leftandmain", function(e) {
            (0, _jQuery2.default)(".cms-container").trigger("windowresize");
        });
        _jQuery2.default.entwine.warningLevel = _jQuery2.default.entwine.WARN_LEVEL_BESTPRACTISE;
        _jQuery2.default.entwine("ss", function($) {
            $(window).on("message", function(e) {
                var target, event = e.originalEvent, data = _typeof(event.data) === "object" ? event.data : JSON.parse(event.data);
                if ($.path.parseUrl(window.location.href).domain !== $.path.parseUrl(event.origin).domain) return;
                target = typeof data.target === "undefined" ? $(window) : $(data.target);
                switch (data.type) {
                  case "event":
                    target.trigger(data.event, data.data);
                    break;

                  case "callback":
                    target[data.callback].call(target, data.data);
                    break;
                }
            });
            var positionLoadingSpinner = function positionLoadingSpinner() {
                var offset = 120;
                var spinner = $(".ss-loading-screen .loading-animation");
                var top = ($(window).height() - spinner.height()) / 2;
                spinner.css("top", top + offset);
                spinner.show();
            };
            var applyChosen = function applyChosen(el) {
                if (el.is(":visible")) {
                    el.addClass("has-chosen").chosen({
                        allow_single_deselect: true,
                        disable_search_threshold: 20,
                        display_disabled_options: true
                    });
                } else {
                    setTimeout(function() {
                        el.show();
                        applyChosen(el);
                    }, 500);
                }
            };
            var isSameUrl = function isSameUrl(url1, url2) {
                var baseUrl = $("base").attr("href");
                url1 = $.path.isAbsoluteUrl(url1) ? url1 : $.path.makeUrlAbsolute(url1, baseUrl), 
                url2 = $.path.isAbsoluteUrl(url2) ? url2 : $.path.makeUrlAbsolute(url2, baseUrl);
                var url1parts = $.path.parseUrl(url1), url2parts = $.path.parseUrl(url2);
                return url1parts.pathname.replace(/\/*$/, "") == url2parts.pathname.replace(/\/*$/, "") && url1parts.search == url2parts.search;
            };
            var ajaxCompleteEvent = window.ss.debounce(function() {
                $(window).trigger("ajaxComplete");
            }, 1e3, true);
            $(window).bind("resize", positionLoadingSpinner).trigger("resize");
            $(document).ajaxComplete(function(e, xhr, settings) {
                var origUrl, url = xhr.getResponseHeader("X-ControllerURL"), destUrl = settings.url, msg = xhr.getResponseHeader("X-Status") !== null ? xhr.getResponseHeader("X-Status") : xhr.statusText, msgType = xhr.status < 200 || xhr.status > 399 ? "bad" : "good", ignoredMessages = [ "OK", "success" ];
                if (window.history.state) {
                    origUrl = window.history.state.path;
                } else {
                    origUrl = document.URL;
                }
                if (url !== null && (!isSameUrl(origUrl, url) || !isSameUrl(destUrl, url))) {
                    window.ss.router.show(url, {
                        id: new Date().getTime() + String(Math.random()).replace(/\D/g, ""),
                        pjax: xhr.getResponseHeader("X-Pjax") ? xhr.getResponseHeader("X-Pjax") : settings.headers["X-Pjax"]
                    });
                }
                if (xhr.getResponseHeader("X-Reauthenticate")) {
                    $(".cms-container").showLoginDialog();
                    return;
                }
                if (xhr.status !== 0 && msg && $.inArray(msg, ignoredMessages) === -1) {
                    statusMessage(decodeURIComponent(msg), msgType);
                }
                ajaxCompleteEvent(this);
            });
            $(".cms-container").entwine({
                StateChangeXHR: null,
                FragmentXHR: {},
                StateChangeCount: 0,
                LayoutOptions: {
                    minContentWidth: 940,
                    minPreviewWidth: 400,
                    mode: "content"
                },
                onadd: function onadd() {
                    if ($.browser.msie && parseInt($.browser.version, 10) < 8) {
                        $(".ss-loading-screen").append('<p class="ss-loading-incompat-warning"><span class="notice">' + "Your browser is not compatible with the CMS interface. Please use Internet Explorer 8+, Google Chrome or Mozilla Firefox." + "</span></p>").css("z-index", $(".ss-loading-screen").css("z-index") + 1);
                        $(".loading-animation").remove();
                        this._super();
                        return;
                    }
                    this.redraw();
                    $(".ss-loading-screen").hide();
                    $("body").removeClass("loading");
                    $(window).unbind("resize", positionLoadingSpinner);
                    this.restoreTabState();
                    this._super();
                },
                fromWindow: {
                    onstatechange: function onstatechange(event, historyState) {
                        this.handleStateChange(event, historyState);
                    }
                },
                onwindowresize: function onwindowresize() {
                    this.redraw();
                },
                "from .cms-panel": {
                    ontoggle: function ontoggle() {
                        this.redraw();
                    }
                },
                "from .cms-container": {
                    onaftersubmitform: function onaftersubmitform() {
                        this.redraw();
                    }
                },
                "from .cms-menu-list li a": {
                    onclick: function onclick(e) {
                        var href = $(e.target).attr("href");
                        if (e.which > 1 || href == this._tabStateUrl()) return;
                        this.splitViewMode();
                    }
                },
                updateLayoutOptions: function updateLayoutOptions(newSpec) {
                    var spec = this.getLayoutOptions();
                    var dirty = false;
                    for (var k in newSpec) {
                        if (spec[k] !== newSpec[k]) {
                            spec[k] = newSpec[k];
                            dirty = true;
                        }
                    }
                    if (dirty) this.redraw();
                },
                splitViewMode: function splitViewMode() {
                    this.updateLayoutOptions({
                        mode: "split"
                    });
                },
                contentViewMode: function contentViewMode() {
                    this.updateLayoutOptions({
                        mode: "content"
                    });
                },
                previewMode: function previewMode() {
                    this.updateLayoutOptions({
                        mode: "preview"
                    });
                },
                RedrawSuppression: false,
                redraw: function redraw() {
                    if (this.getRedrawSuppression()) return;
                    if (window.debug) console.log("redraw", this.attr("class"), this.get(0));
                    this.data("jlayout", jLayout.threeColumnCompressor({
                        menu: this.children(".cms-menu"),
                        content: this.children(".cms-content"),
                        preview: this.children(".cms-preview")
                    }, this.getLayoutOptions()));
                    this.layout();
                    this.find(".cms-panel-layout").redraw();
                    this.find(".cms-content-fields[data-layout-type]").redraw();
                    this.find(".cms-edit-form[data-layout-type]").redraw();
                    this.find(".cms-preview").redraw();
                    this.find(".cms-content").redraw();
                },
                checkCanNavigate: function checkCanNavigate(selectors) {
                    var contentEls = this._findFragments(selectors || [ "Content" ]), trackedEls = contentEls.find(":data(changetracker)").add(contentEls.filter(":data(changetracker)")), safe = true;
                    if (!trackedEls.length) {
                        return true;
                    }
                    trackedEls.each(function() {
                        if (!$(this).confirmUnsavedChanges()) {
                            safe = false;
                        }
                    });
                    return safe;
                },
                loadPanel: function loadPanel(url) {
                    var title = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
                    var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                    var forceReload = arguments[3];
                    var forceReferer = arguments.length <= 4 || arguments[4] === undefined ? window.history.state.path : arguments[4];
                    if (!this.checkCanNavigate(data.pjax ? data.pjax.split(",") : [ "Content" ])) {
                        return;
                    }
                    this.saveTabState();
                    data.__forceReferer = forceReferer;
                    if (forceReload) {
                        data.__forceReload = Math.random();
                    }
                    window.ss.router.show(url, data);
                },
                reloadCurrentPanel: function reloadCurrentPanel() {
                    this.loadPanel(window.history.state.path, null, null, true);
                },
                submitForm: function submitForm(form, button, callback, ajaxOptions) {
                    var self = this;
                    if (!button) button = this.find(".btn-toolbar :submit[name=action_save]");
                    if (!button) button = this.find(".btn-toolbar :submit:first");
                    form.trigger("beforesubmitform");
                    this.trigger("submitform", {
                        form: form,
                        button: button
                    });
                    $(button).addClass("loading");
                    var validationResult = form.validate();
                    if (typeof validationResult !== "undefined" && !validationResult) {
                        statusMessage("Validation failed.", "bad");
                        $(button).removeClass("loading");
                        return false;
                    }
                    var formData = form.serializeArray();
                    formData.push({
                        name: $(button).attr("name"),
                        value: "1"
                    });
                    formData.push({
                        name: "BackURL",
                        value: window.history.state.path.replace(/\/$/, "")
                    });
                    this.saveTabState();
                    jQuery.ajax(jQuery.extend({
                        headers: {
                            "X-Pjax": "CurrentForm,Breadcrumbs"
                        },
                        url: form.attr("action"),
                        data: formData,
                        type: "POST",
                        complete: function complete() {
                            $(button).removeClass("loading");
                        },
                        success: function success(data, status, xhr) {
                            form.removeClass("changed");
                            if (callback) callback(data, status, xhr);
                            var newContentEls = self.handleAjaxResponse(data, status, xhr);
                            if (!newContentEls) return;
                            newContentEls.filter("form").trigger("aftersubmitform", {
                                status: status,
                                xhr: xhr,
                                formData: formData
                            });
                        }
                    }, ajaxOptions));
                    return false;
                },
                LastState: null,
                PauseState: false,
                handleStateChange: function handleStateChange(event) {
                    var historyState = arguments.length <= 1 || arguments[1] === undefined ? window.history.state : arguments[1];
                    if (this.getPauseState()) {
                        return;
                    }
                    if (this.getStateChangeXHR()) {
                        this.getStateChangeXHR().abort();
                    }
                    var self = this, fragments = historyState.pjax || "Content", headers = {}, fragmentsArr = fragments.split(","), contentEls = this._findFragments(fragmentsArr);
                    this.setStateChangeCount(this.getStateChangeCount() + 1);
                    if (!this.checkCanNavigate()) {
                        var lastState = this.getLastState();
                        this.setPauseState(true);
                        if (lastState !== null) {
                            window.ss.router.show(lastState.url);
                        } else {
                            window.ss.router.back();
                        }
                        this.setPauseState(false);
                        return;
                    }
                    this.setLastState(historyState);
                    if (contentEls.length < fragmentsArr.length) {
                        fragments = "Content", fragmentsArr = [ "Content" ];
                        contentEls = this._findFragments(fragmentsArr);
                    }
                    this.trigger("beforestatechange", {
                        state: historyState,
                        element: contentEls
                    });
                    headers["X-Pjax"] = fragments;
                    if (typeof historyState.__forceReferer !== "undefined") {
                        var url = historyState.__forceReferer;
                        try {
                            url = decodeURI(url);
                        } catch (e) {} finally {
                            headers["X-Backurl"] = encodeURI(url);
                        }
                    }
                    contentEls.addClass("loading");
                    var promise = $.ajax({
                        headers: headers,
                        url: historyState.path
                    }).done(function(data, status, xhr) {
                        var els = self.handleAjaxResponse(data, status, xhr, historyState);
                        self.trigger("afterstatechange", {
                            data: data,
                            status: status,
                            xhr: xhr,
                            element: els,
                            state: historyState
                        });
                    }).always(function() {
                        self.setStateChangeXHR(null);
                        contentEls.removeClass("loading");
                    });
                    this.setStateChangeXHR(promise);
                    return promise;
                },
                loadFragment: function loadFragment(url, pjaxFragments) {
                    var self = this, xhr, headers = {}, baseUrl = $("base").attr("href"), fragmentXHR = this.getFragmentXHR();
                    if (typeof fragmentXHR[pjaxFragments] !== "undefined" && fragmentXHR[pjaxFragments] !== null) {
                        fragmentXHR[pjaxFragments].abort();
                        fragmentXHR[pjaxFragments] = null;
                    }
                    url = $.path.isAbsoluteUrl(url) ? url : $.path.makeUrlAbsolute(url, baseUrl);
                    headers["X-Pjax"] = pjaxFragments;
                    xhr = $.ajax({
                        headers: headers,
                        url: url,
                        success: function success(data, status, xhr) {
                            var elements = self.handleAjaxResponse(data, status, xhr, null);
                            self.trigger("afterloadfragment", {
                                data: data,
                                status: status,
                                xhr: xhr,
                                elements: elements
                            });
                        },
                        error: function error(xhr, status, _error) {
                            self.trigger("loadfragmenterror", {
                                xhr: xhr,
                                status: status,
                                error: _error
                            });
                        },
                        complete: function complete() {
                            var fragmentXHR = self.getFragmentXHR();
                            if (typeof fragmentXHR[pjaxFragments] !== "undefined" && fragmentXHR[pjaxFragments] !== null) {
                                fragmentXHR[pjaxFragments] = null;
                            }
                        }
                    });
                    fragmentXHR[pjaxFragments] = xhr;
                    return xhr;
                },
                handleAjaxResponse: function handleAjaxResponse(data, status, xhr, state) {
                    var self = this, url, selectedTabs, guessFragment, fragment, $data;
                    if (xhr.getResponseHeader("X-Reload") && xhr.getResponseHeader("X-ControllerURL")) {
                        var baseUrl = $("base").attr("href"), rawURL = xhr.getResponseHeader("X-ControllerURL"), url = $.path.isAbsoluteUrl(rawURL) ? rawURL : $.path.makeUrlAbsolute(rawURL, baseUrl);
                        document.location.href = url;
                        return;
                    }
                    if (!data) return;
                    var title = xhr.getResponseHeader("X-Title");
                    if (title) document.title = decodeURIComponent(title.replace(/\+/g, " "));
                    var newFragments = {}, newContentEls;
                    if (xhr.getResponseHeader("Content-Type").match(/^((text)|(application))\/json[ \t]*;?/i)) {
                        newFragments = data;
                    } else {
                        fragment = document.createDocumentFragment();
                        jQuery.clean([ data ], document, fragment, []);
                        $data = $(jQuery.merge([], fragment.childNodes));
                        guessFragment = "Content";
                        if ($data.is("form") && !$data.is("[data-pjax-fragment~=Content]")) guessFragment = "CurrentForm";
                        newFragments[guessFragment] = $data;
                    }
                    this.setRedrawSuppression(true);
                    try {
                        $.each(newFragments, function(newFragment, html) {
                            var contentEl = $("[data-pjax-fragment]").filter(function() {
                                return $.inArray(newFragment, $(this).data("pjaxFragment").split(" ")) != -1;
                            }), newContentEl = $(html);
                            if (newContentEls) newContentEls.add(newContentEl); else newContentEls = newContentEl;
                            if (newContentEl.find(".cms-container").length) {
                                throw 'Content loaded via ajax is not allowed to contain tags matching the ".cms-container" selector to avoid infinite loops';
                            }
                            var origStyle = contentEl.attr("style");
                            var origParent = contentEl.parent();
                            var origParentLayoutApplied = typeof origParent.data("jlayout") !== "undefined";
                            var layoutClasses = [ "east", "west", "center", "north", "south", "column-hidden" ];
                            var elemClasses = contentEl.attr("class");
                            var origLayoutClasses = [];
                            if (elemClasses) {
                                origLayoutClasses = $.grep(elemClasses.split(" "), function(val) {
                                    return $.inArray(val, layoutClasses) >= 0;
                                });
                            }
                            newContentEl.removeClass(layoutClasses.join(" ")).addClass(origLayoutClasses.join(" "));
                            if (origStyle) newContentEl.attr("style", origStyle);
                            var styles = newContentEl.find("style").detach();
                            if (styles.length) $(document).find("head").append(styles);
                            contentEl.replaceWith(newContentEl);
                            if (!origParent.is(".cms-container") && origParentLayoutApplied) {
                                origParent.layout();
                            }
                        });
                        var newForm = newContentEls.filter("form");
                        if (newForm.hasClass("cms-tabset")) newForm.removeClass("cms-tabset").addClass("cms-tabset");
                    } finally {
                        this.setRedrawSuppression(false);
                    }
                    this.redraw();
                    this.restoreTabState(state && typeof state.tabState !== "undefined" ? state.tabState : null);
                    return newContentEls;
                },
                _findFragments: function _findFragments(fragments) {
                    return $("[data-pjax-fragment]").filter(function() {
                        var i, nodeFragments = $(this).data("pjaxFragment").split(" ");
                        for (i in fragments) {
                            if ($.inArray(fragments[i], nodeFragments) != -1) return true;
                        }
                        return false;
                    });
                },
                refresh: function refresh() {
                    $(window).trigger("statechange");
                    $(this).redraw();
                },
                saveTabState: function saveTabState() {
                    if (typeof window.sessionStorage == "undefined" || window.sessionStorage === null) return;
                    var selectedTabs = [], url = this._tabStateUrl();
                    this.find(".cms-tabset,.ss-tabset").each(function(i, el) {
                        var id = $(el).attr("id");
                        if (!id) return;
                        if (!$(el).data("tabs")) return;
                        if ($(el).data("ignoreTabState") || $(el).getIgnoreTabState()) return;
                        selectedTabs.push({
                            id: id,
                            selected: $(el).tabs("option", "selected")
                        });
                    });
                    if (selectedTabs) {
                        var tabsUrl = "tabs-" + url;
                        try {
                            window.sessionStorage.setItem(tabsUrl, JSON.stringify(selectedTabs));
                        } catch (err) {
                            if (err.code === DOMException.QUOTA_EXCEEDED_ERR && window.sessionStorage.length === 0) {
                                return;
                            } else {
                                throw err;
                            }
                        }
                    }
                },
                restoreTabState: function restoreTabState(overrideStates) {
                    var self = this, url = this._tabStateUrl(), hasSessionStorage = typeof window.sessionStorage !== "undefined" && window.sessionStorage, sessionData = hasSessionStorage ? window.sessionStorage.getItem("tabs-" + url) : null, sessionStates = sessionData ? JSON.parse(sessionData) : false;
                    this.find(".cms-tabset, .ss-tabset").each(function() {
                        var index, tab, tabset = $(this), tabsetId = tabset.attr("id"), forcedTab = tabset.children("ul").children("li.ss-tabs-force-active");
                        if (!tabset.data("tabs")) {
                            return;
                        }
                        tabset.tabs("refresh");
                        if (forcedTab.length) {
                            index = forcedTab.first().index();
                        } else if (overrideStates && overrideStates[tabsetId]) {
                            tab = tabset.find(overrideStates[tabsetId].tabSelector);
                            if (tab.length) {
                                index = tab.index();
                            }
                        } else if (sessionStates) {
                            $.each(sessionStates, function(i, state) {
                                if (tabsetId == state.id) {
                                    index = state.selected;
                                }
                            });
                        }
                        if (index !== null) {
                            tabset.tabs("option", "active", index);
                            self.trigger("tabstaterestored");
                        }
                    });
                },
                clearTabState: function clearTabState(url) {
                    if (typeof window.sessionStorage == "undefined") return;
                    var s = window.sessionStorage;
                    if (url) {
                        s.removeItem("tabs-" + url);
                    } else {
                        for (var i = 0; i < s.length; i++) {
                            if (s.key(i).match(/^tabs-/)) s.removeItem(s.key(i));
                        }
                    }
                },
                clearCurrentTabState: function clearCurrentTabState() {
                    this.clearTabState(this._tabStateUrl());
                },
                _tabStateUrl: function _tabStateUrl() {
                    if (window.history.state === null) {
                        return;
                    }
                    return window.history.state.path.replace(/\?.*/, "").replace(/#.*/, "").replace($("base").attr("href"), "");
                },
                showLoginDialog: function showLoginDialog() {
                    var tempid = $("body").data("member-tempid"), dialog = $(".leftandmain-logindialog"), url = "CMSSecurity/login";
                    if (dialog.length) dialog.remove();
                    url = $.path.addSearchParams(url, {
                        tempid: tempid,
                        BackURL: window.location.href
                    });
                    dialog = $('<div class="leftandmain-logindialog"></div>');
                    dialog.attr("id", new Date().getTime());
                    dialog.data("url", url);
                    $("body").append(dialog);
                }
            });
            $(".leftandmain-logindialog").entwine({
                onmatch: function onmatch() {
                    this._super();
                    this.ssdialog({
                        iframeUrl: this.data("url"),
                        dialogClass: "leftandmain-logindialog-dialog",
                        autoOpen: true,
                        minWidth: 500,
                        maxWidth: 500,
                        minHeight: 370,
                        maxHeight: 400,
                        closeOnEscape: false,
                        open: function open() {
                            $(".ui-widget-overlay").addClass("leftandmain-logindialog-overlay");
                        },
                        close: function close() {
                            $(".ui-widget-overlay").removeClass("leftandmain-logindialog-overlay");
                        }
                    });
                },
                onunmatch: function onunmatch() {
                    this._super();
                },
                open: function open() {
                    this.ssdialog("open");
                },
                close: function close() {
                    this.ssdialog("close");
                },
                toggle: function toggle(bool) {
                    if (this.is(":visible")) this.close(); else this.open();
                },
                reauthenticate: function reauthenticate(data) {
                    if (typeof data.SecurityID !== "undefined") {
                        $(":input[name=SecurityID]").val(data.SecurityID);
                    }
                    if (typeof data.TempID !== "undefined") {
                        $("body").data("member-tempid", data.TempID);
                    }
                    this.close();
                }
            });
            $("form.loading,.cms-content.loading,.cms-content-fields.loading,.cms-content-view.loading").entwine({
                onmatch: function onmatch() {
                    this.append('<div class="cms-content-loading-overlay ui-widget-overlay-light"></div><div class="cms-content-loading-spinner"></div>');
                    this._super();
                },
                onunmatch: function onunmatch() {
                    this.find(".cms-content-loading-overlay,.cms-content-loading-spinner").remove();
                    this._super();
                }
            });
            $('.cms input[type="submit"], .cms button, .cms input[type="reset"], .cms .ss-ui-button').entwine({
                onadd: function onadd() {
                    this.addClass("ss-ui-button");
                    if (!this.data("button")) this.button();
                    this._super();
                },
                onremove: function onremove() {
                    if (this.data("button")) this.button("destroy");
                    this._super();
                }
            });
            $(".cms .cms-panel-link").entwine({
                onclick: function onclick(e) {
                    if ($(this).hasClass("external-link")) {
                        e.stopPropagation();
                        return;
                    }
                    var href = this.attr("href"), url = href && !href.match(/^#/) ? href : this.data("href"), data = {
                        pjax: this.data("pjaxTarget")
                    };
                    $(".cms-container").loadPanel(url, null, data);
                    e.preventDefault();
                }
            });
            $(".cms .ss-ui-button-ajax").entwine({
                onclick: function onclick(e) {
                    $(this).removeClass("ui-button-text-only");
                    $(this).addClass("ss-ui-button-loading ui-button-text-icons");
                    var loading = $(this).find(".ss-ui-loading-icon");
                    if (loading.length < 1) {
                        loading = $("<span></span>").addClass("ss-ui-loading-icon ui-button-icon-primary ui-icon");
                        $(this).prepend(loading);
                    }
                    loading.show();
                    var href = this.attr("href"), url = href ? href : this.data("href");
                    jQuery.ajax({
                        url: url,
                        complete: function complete(xmlhttp, status) {
                            var msg = xmlhttp.getResponseHeader("X-Status") ? xmlhttp.getResponseHeader("X-Status") : xmlhttp.responseText;
                            try {
                                if (typeof msg != "undefined" && msg !== null) eval(msg);
                            } catch (e) {}
                            loading.hide();
                            $(".cms-container").refresh();
                            $(this).removeClass("ss-ui-button-loading ui-button-text-icons");
                            $(this).addClass("ui-button-text-only");
                        },
                        dataType: "html"
                    });
                    e.preventDefault();
                }
            });
            $(".cms .ss-ui-dialog-link").entwine({
                UUID: null,
                onmatch: function onmatch() {
                    this._super();
                    this.setUUID(new Date().getTime());
                },
                onunmatch: function onunmatch() {
                    this._super();
                },
                onclick: function onclick() {
                    this._super();
                    var self = this, id = "ss-ui-dialog-" + this.getUUID();
                    var dialog = $("#" + id);
                    if (!dialog.length) {
                        dialog = $('<div class="ss-ui-dialog" id="' + id + '" />');
                        $("body").append(dialog);
                    }
                    var extraClass = this.data("popupclass") ? this.data("popupclass") : "";
                    dialog.ssdialog({
                        iframeUrl: this.attr("href"),
                        autoOpen: true,
                        dialogExtraClass: extraClass
                    });
                    return false;
                }
            });
            $(".cms-content .btn-toolbar").entwine({
                onmatch: function onmatch() {
                    this.find(".ss-ui-button").click(function() {
                        var form = this.form;
                        if (form) {
                            form.clickedButton = this;
                            setTimeout(function() {
                                form.clickedButton = null;
                            }, 10);
                        }
                    });
                    this.redraw();
                    this._super();
                },
                onunmatch: function onunmatch() {
                    this._super();
                },
                redraw: function redraw() {
                    if (window.debug) console.log("redraw", this.attr("class"), this.get(0));
                    this.contents().filter(function() {
                        return this.nodeType == 3 && !/\S/.test(this.nodeValue);
                    }).remove();
                    this.find(".ss-ui-button").each(function() {
                        if (!$(this).data("button")) $(this).button();
                    });
                    this.find(".ss-ui-buttonset").buttonset();
                }
            });
            $(".cms .field.date input.text").entwine({
                onmatch: function onmatch() {
                    var holder = $(this).parents(".field.date:first"), config = holder.data();
                    if (!config.showcalendar) {
                        this._super();
                        return;
                    }
                    config.showOn = "button";
                    if (config.locale && $.datepicker.regional[config.locale]) {
                        config = $.extend(config, $.datepicker.regional[config.locale], {});
                    }
                    $(this).datepicker(config);
                    this._super();
                },
                onunmatch: function onunmatch() {
                    this._super();
                }
            });
            $(".cms .field.dropdown select, .cms .field select[multiple], .fieldholder-small select.dropdown").entwine({
                onmatch: function onmatch() {
                    if (this.is(".no-chosen")) {
                        this._super();
                        return;
                    }
                    if (!this.data("placeholder")) this.data("placeholder", " ");
                    this.removeClass("has-chosen").chosen("destroy");
                    this.siblings(".chosen-container").remove();
                    applyChosen(this);
                    this._super();
                },
                onunmatch: function onunmatch() {
                    this._super();
                }
            });
            $(".cms-panel-layout").entwine({
                redraw: function redraw() {
                    if (window.debug) console.log("redraw", this.attr("class"), this.get(0));
                }
            });
            $(".cms .ss-gridfield").entwine({
                showDetailView: function showDetailView(url) {
                    var params = window.location.search.replace(/^\?/, "");
                    if (params) url = $.path.addSearchParams(url, params);
                    $(".cms-container").loadPanel(url);
                }
            });
            $(".cms-search-form").entwine({
                onsubmit: function onsubmit(e) {
                    var nonEmptyInputs, url;
                    nonEmptyInputs = this.find(":input:not(:submit)").filter(function() {
                        var vals = $.grep($(this).fieldValue(), function(val) {
                            return val;
                        });
                        return vals.length;
                    });
                    url = this.attr("action");
                    if (nonEmptyInputs.length) {
                        url = $.path.addSearchParams(url, nonEmptyInputs.serialize().replace("+", "%20"));
                    }
                    var container = this.closest(".cms-container");
                    container.find(".cms-edit-form").tabs("select", 0);
                    container.loadPanel(url, "", {}, true);
                    return false;
                }
            });
            $(".cms-search-form button[type=reset], .cms-search-form input[type=reset]").entwine({
                onclick: function onclick(e) {
                    e.preventDefault();
                    var form = $(this).parents("form");
                    form.clearForm();
                    form.find(".dropdown select").prop("selectedIndex", 0).trigger("chosen:updated");
                    form.submit();
                }
            });
            window._panelDeferredCache = {};
            $(".cms-panel-deferred").entwine({
                onadd: function onadd() {
                    this._super();
                    this.redraw();
                },
                onremove: function onremove() {
                    if (window.debug) console.log("saving", this.data("url"), this);
                    if (!this.data("deferredNoCache")) window._panelDeferredCache[this.data("url")] = this.html();
                    this._super();
                },
                redraw: function redraw() {
                    if (window.debug) console.log("redraw", this.attr("class"), this.get(0));
                    var self = this, url = this.data("url");
                    if (!url) throw 'Elements of class .cms-panel-deferred need a "data-url" attribute';
                    this._super();
                    if (!this.children().length) {
                        if (!this.data("deferredNoCache") && typeof window._panelDeferredCache[url] !== "undefined") {
                            this.html(window._panelDeferredCache[url]);
                        } else {
                            this.addClass("loading");
                            $.ajax({
                                url: url,
                                complete: function complete() {
                                    self.removeClass("loading");
                                },
                                success: function success(data, status, xhr) {
                                    self.html(data);
                                }
                            });
                        }
                    }
                }
            });
            $(".cms-tabset").entwine({
                onadd: function onadd() {
                    this.redrawTabs();
                    this._super();
                },
                onremove: function onremove() {
                    if (this.data("tabs")) this.tabs("destroy");
                    this._super();
                },
                redrawTabs: function redrawTabs() {
                    this.rewriteHashlinks();
                    var id = this.attr("id"), activeTab = this.find("ul:first .ui-tabs-active");
                    if (!this.data("uiTabs")) this.tabs({
                        active: activeTab.index() != -1 ? activeTab.index() : 0,
                        beforeLoad: function beforeLoad(e, ui) {
                            return false;
                        },
                        activate: function activate(e, ui) {
                            var actions = $(this).closest("form").find(".btn-toolbar");
                            if ($(ui.newTab).closest("li").hasClass("readonly")) {
                                actions.fadeOut();
                            } else {
                                actions.show();
                            }
                        }
                    });
                    this.trigger("afterredrawtabs");
                },
                rewriteHashlinks: function rewriteHashlinks() {
                    $(this).find("ul a").each(function() {
                        if (!$(this).attr("href")) return;
                        var matches = $(this).attr("href").match(/#.*/);
                        if (!matches) return;
                        $(this).attr("href", document.location.href.replace(/#.*/, "") + matches[0]);
                    });
                }
            });
            $("#filters-button").entwine({
                onmatch: function onmatch() {
                    this._super();
                    this.data("collapsed", true);
                    this.data("animating", false);
                },
                onunmatch: function onunmatch() {
                    this._super();
                },
                showHide: function showHide() {
                    var self = this, $filters = $(".cms-content-filters").first(), collapsed = this.data("collapsed");
                    if (this.data("animating")) {
                        return;
                    }
                    this.toggleClass("active");
                    this.data("animating", true);
                    $filters[collapsed ? "slideDown" : "slideUp"]({
                        complete: function complete() {
                            self.data("collapsed", !collapsed);
                            self.data("animating", false);
                        }
                    });
                },
                onclick: function onclick() {
                    this.showHide();
                }
            });
        });
        var statusMessage = function statusMessage(text, type) {
            text = jQuery("<div/>").text(text).html();
            jQuery.noticeAdd({
                text: text,
                type: type,
                stayTime: 5e3,
                inEffect: {
                    left: "0",
                    opacity: "show"
                }
            });
        };
        var errorMessage = function errorMessage(text) {
            jQuery.noticeAdd({
                text: text,
                type: "error",
                stayTime: 5e3,
                inEffect: {
                    left: "0",
                    opacity: "show"
                }
            });
        };
    }, {
        jQuery: "jQuery"
    } ]
}, {}, [ 1 ]);
//# sourceMappingURL=bundle-legacy.js.map
