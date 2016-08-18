/**
 * Created by frank on 1/1/16.
 */
/*
 @license
 webix UI v.3.1.2
 This software is can be used only as part of webix.com site
 You are not allowed to copy this file and use in any other project
 */
console.log("Loading Pivot.js");
webix.i18n.pivot = webix.extend(webix.i18n.pivot || {}, {
	                                apply: "Apply",
	                                cancel: "Cancel",
	                                columns: "Columns",
	                                count: "count",
	                                date: "date",
	                                fields: "Fields",
	                                filters: "Filters",
	                                max: "max",
	                                min: "min",
	                                multiselect: "multi-select",
	                                operationNotDefined: "Operation is not defined",
	                                pivotMessage: "[Click to configure]",
	                                rows: "Rows",
	                                select: "select",
	                                sum: "sum",
	                                text: "text",
	                                values: "Values",
	                                total: "Total",
	                                windowTitle: "Pivot Configuration",
	                                windowMessage: "move fields into a required sector"
                                }
), webix.ui.datafilter.pivotSumColumn = webix.extend({
	                                                     refresh: function (t, e, i) {
		                                                     var s = 0;
		                                                     t.mapCells(null, i.columnId, null, 1, function (e, i) {
			                                                                return e = 1 * e, isNaN(e
			                                                                ) || 1 != t.getItem(i).$level || (s += e), e
		                                                                }
		                                                     ), i.format && (s = i.format(s
		                                                     )), i.template && (s = i.template({value: s}
		                                                     )), e.firstChild.innerHTML = s
	                                                     }
                                                     }, webix.ui.datafilter.summColumn
), webix.protoUI({
	                 name: "pivot",
	                 version: "3.1.2",
	                 defaults: {
		                 fieldMap: {},
		                 yScaleWidth: 300,
		                 columnWidth: 150,
		                 filterLabelAlign: "right",
		                 filterWidth: 300,
		                 filterMinWidth: 150,
		                 filterLabelWidth: 100
	                 },
	                 $divider: "_'_",
	                 $init: function (t) {
		                 t.structure || (t.structure = {}), webix.extend(t.structure, {
			                                                                 rows: [],
			                                                                 columns: [],
			                                                                 values: [],
			                                                                 filters: []
		                                                                 }
		                 ), this.$view.className += " webix_pivot", webix.extend(t, this.Iu(t)), this.$ready.push(
			                 this.render
		                 ), this.data.attachEvent("onStoreUpdated", webix.bind(function () {
			                                                                       this.$$("data") && this.render()
		                                                                       }, this
		                                          )
		                 )
	                 },
	                 Iu: function (t) {
		                 var e = {id: "filters", view: "toolbar", hidden: !0, cols: [{}]}, i = {
			                 view: "treetable",
			                 id: "data",
			                 select: "row",
			                 navigation: !0,
			                 leftSplit: 1,
			                 resizeColumn: !0,
			                 on: {
				                 onHeaderClick: function (t) {
					                 var e = this.getTopParentView();
					                 0 !== this.getColumnIndex(t.column) || e.config.readonly || e.configure()
				                 }
			                 },
			                 columns: [{}]
		                 };
		                 return t.datatable && "object" == typeof t.datatable && (delete t.datatable.id, webix.extend(i,
		                                                                                                              t.datatable,
		                                                                                                              !0
		                 )), {rows: [e, i]}
	                 },
	                 configure: function () {
		                 if (!this.Ju) {
			                 var t = {view: "webix_pivot_config", operations: [], pivot: this.config.id};
			                 webix.extend(t, this.config.popup || {}), this.Ju = webix.ui(t), this.callEvent("onPopup",
			                                                                                                 [this.Ju]
			                 ), this.Ju.attachEvent("onApply", webix.bind(function (t) {
				                                                              this.define("structure", t), this.render()
			                                                              }, this
			                                        )
			                 )
		                 }
		                 var e = [];
		                 for (var i in this.operations)e.push({name: i, title: this.Ku(i)});
		                 this.Ju.define("operations", e);
		                 var s = webix.html.offset(this.$$("data").getNode());
		                 this.Ju.setPosition(s.x + 10, s.y + 10), this.Ju.define("data", this.getFields()
		                 ), this.Ju.show()
	                 },
	                 render: function (t) {
		                 var e = this.Lu(this.data.pull, this.data.order);
		                 if (!t) {
			                 var i = this.Mu();
			                 i.length > 0 ? (this.$$("filters").show(), this.$$("filters").define("cols", i
			                 ), this.Nu()) : this.$$("filters").hide()
		                 }
		                 this.config.totalColumn && this.$$("data").define("math", !0), this.$$("data"
		                 ).config.columns = e.header, this.config.footer && this.Pz(), this.$$("data"
		                 ).refreshColumns(), this.$$("data").clearAll(), this.$$("data").parse(e.data)
	                 },
	                 Pz: function () {
		                 var t, e, i, s;
		                 for (e = this.$$("data"), e.define("footer", !0), e.config.columns[0].footer = this.Ku("total"
		                 ), i = 1; i < e.config.columns.length; i++) {
			                 if (t = null, "sumOnly" == this.config.footer) {
				                 var s = e.config.columns[i].id.split(this.$divider);
				                 "sum" != s[s.length - 2] && (t = " ")
			                 }
			                 t || (t = {
				                 content: "pivotSumColumn", template: webix.bind(function (t) {
					                                                                 var e = t.value;
					                                                                 return e && "0" != e && !this.format ? parseFloat(e).toFixed(3) : e
				                                                                 }, e.config.columns[i]
				                 )
			                 }), e.config.columns[i].footer = t, "object" == typeof this.config.footer && webix.extend(
				                 e.config.columns[i].footer, this.config.footer, !0
			                 )
		                 }
	                 },
	                 toPDF: function () {this.$$("data").exportToPDF.apply(this.$$("data"), arguments)},
	                 toExcel: function () {
		                 this.$$("data").exportToExcel.apply(this.$$("data"), arguments)
	                 },
	                 Ku: function (t) {return webix.i18n.pivot[t] || t},
	                 Ou: function (t) {return this.config.fieldMap[t] || t},
	                 Mu: function () {
		                 for (var t = this.config.structure.filters || [], e = [], i = 0; i < t.length; i++) {
			                 var s = t[i], n = {
				                 value: s.value,
				                 label: this.Ou(s.name),
				                 field: s.name,
				                 view: s.type,
				                 labelAlign: this.config.filterLabelAlign,
				                 labelWidth: this.config.filterLabelWidth,
				                 minWidth: this.config.filterMinWidth,
				                 maxWidth: this.config.filterWidth
			                 };
			                 ("select" == s.type || "multiselect" == s.type) && (n.options = this.Pu(s.name)), e.push(n)
		                 }
		                 return e
	                 },
	                 Pu: function (t) {
		                 var e = [{value: "", id: ""}], i = this.data.pull, s = {};
		                 for (var n in i) {
			                 var r = i[n][t];
			                 webix.isUndefined(r) || s[r] || (e.push({value: r, id: r}), s[r] = !0)
		                 }
		                 return e
	                 },
	                 Nu: function () {
		                 var t = this.$$("filters");
		                 t.reconstruct();
		                 for (var e = t.getChildViews(), i = this, s = 0; s < e.length; s++) {
			                 var n = e[s];
			                 "select" == n.name || "multiselect" == n.name || "datepicker" == n.name ? n.attachEvent(
				                 "onChange", function (t) {i.Qu(this.config.field, t)}
			                 ) : n.attachEvent("onTimedKeyPress", function () {i.Qu(n.config.field, n.getValue())})
		                 }
	                 },
	                 Qu: function (t, e) {
		                 for (var i = this.config.structure.filters, s = 0; s < i.length; s++)if (i[s].name == t)return i[s].value = e, this.render(
			                 !0
		                 ), !0;
		                 return !1
	                 },
	                 Lu: function (t, e) {
		                 this.Ru();
		                 var i = this.config.structure;
		                 i.I = [], i.Su = {};
		                 for (var s = 0; s < i.values.length; s++)i.values[s].operation = i.values[s].operation || ["sum"], webix.isArray(
			                 i.values[s].operation
		                 ) || (i.values[s].operation = [i.values[s].operation]);
		                 for (var n = [], s = 0; s < i.columns.length; s++)n[s] = "object" == typeof i.columns[s] ? i.columns[s].id || s : i.columns[s];
		                 var r = i.rows.concat(n), a = this.Tu(t, e, r), o = {};
		                 return i.rows.length > 0 ? a = this.Uu(a, i.rows, i, o) : (this.Vu(a, n, i, o
		                 ), a = []), o = this.Wu(o), {header: o, data: a}
	                 },
	                 Qz: function (t, e, i) {
		                 if (i.length) {
			                 var s = e[i[0]];
			                 webix.isUndefined(t[s]) && (t[s] = {}), this.Qz(t[s], e, i.slice(1))
		                 } else t[e.id] = e
	                 },
	                 Tu: function (t, e, i) {
		                 var s, n, r, a = {};
		                 for (r = 0; r < e.length; r++)s = e[r], n = t[s], n && this.Xu(n) && this.Qz(a, n, i);
		                 return a
	                 },
	                 Uu: function (t, e, i, s) {
		                 var n = [];
		                 if (e.length > 1) {
			                 for (var r in t)t[r] = this.Uu(t[r], e.slice(1), i, s);
			                 var a = i.I;
			                 for (var r in t) {
				                 for (var o = {data: t[r]}, h = 0; h < o.data.length; h++)for (var l = 0; l < a.length; l++) {
					                 var u = a[l];
					                 webix.isUndefined(o[u]) && (o[u] = []), o[u].push(o.data[h][u])
				                 }
				                 o = this.Yu(o, i), o = this.Zu(o, i), o.name = r, o.open = !0, n.push(o)
			                 }
		                 } else for (var r in t) {
			                 var o = this.Vu(t[r], this.config.structure.columns, i, s);
			                 o.name = r, o = this.Yu(o, i), o = this.Zu(o, i), n.push(o)
		                 }
		                 return n
	                 },
	                 Vu: function (t, e, i, s, n, r) {
		                 if (n = n || {}, e.length > 0) {
			                 r = r || "";
			                 for (var a in t)s[a] || (s[a] = {}), t[a] = this.Vu(t[a], e.slice(1), i, s[a], n,
			                                                                     (r.length > 0 ? r + this.$divider : "") + a
			                 )
		                 } else if (!webix.isUndefined(r)) {
			                 var o = this.config.structure.values;
			                 for (var h in t)for (var a = 0; a < o.length; a++)for (var l = 0; l < o[a].operation.length; l++) {
				                 var u = r + this.$divider + o[a].operation[l] + this.$divider + o[a].name;
				                 i.Su[u] || (i.I.push(u), i.Su[u] = !0), webix.isUndefined(n[u]
				                 ) && (n[u] = [], s[o[a].operation[l] + this.$divider + o[a].name] = {}), n[u].push(
					                 t[h][o[a].name]
				                 )
			                 }
		                 }
		                 return n
	                 },
	                 Rz: function (t) {
		                 for (var e = this.config.structure.columns, i = !1, s = !1, n = 0; n < e.length && !s; n++)"object" == typeof e[n] && e[n].sort && (s = !0);
		                 if (!s)return !1;
		                 if (t.sort(function (t, s) {
			                            for (var n, r = null, a = 0; a < e.length && null === r; a++) {
				                            var o = e[a];
				                            if ("object" == typeof o && o.sort) {
					                            var h = o.sort;
					                            "string" == typeof o.sort && (h = webix.DataStore.prototype.zf.Hf[o.sort]);
					                            var n = h(t[a].text, s[a].text);
					                            (n || a == e.length - 1) && (i = !0, "desc" == o.sortDir && (n = -1 * n), r = n)
				                            } else r = 0
			                            }
			                            return r
		                            }
			                 ), t[0])for (var r = t[0].length - 2; r >= 0;) {
			                 for (var a = "", o = 0, n = 0; n < t.length; n++)a != t[n][r].text ? (o = n, a = t[n][r].text, t[n][r].colspan = 1) : (delete t[n][r].colspan, t[o][r].colspan++);
			                 r--
		                 }
	                 },
	                 Wu: function (t) {
		                 t = this.$u(t), this.Rz(t);
		                 for (var e, i = this.config.structure.values, s = 0; s < t.length; s++) {
			                 for (var n = [], r = 0; r < t[s].length; r++)n.push(t[s][r].name);
			                 e = null;
			                 for (var a = n[n.length - 1].split(this.$divider
			                 ), r = 0; r < i.length && !e; r++)if (i[r].operation)for (var o = 0; o < i[r].operation.length; o++)i[r].name == a[1] && i[r].operation[o] == a[0] && (e = i[r]);
			                 t[s] = {
				                 id: n.join(this.$divider),
				                 header: t[s],
				                 sort: "int",
				                 width: this.config.columnWidth
			                 }, e && e.format && (t[s].format = e.format)
		                 }
		                 this.callEvent("onHeaderInit", [t]), this.config.totalColumn && t.length && (t = this.Sz(t));
		                 var h = "<div class='webix_pivot_config_msg'>" + webix.i18n.pivot.pivotMessage + "</div>";
		                 return this.config.readonly && (h = this.config.readonlyTitle || "", this.$$("data"
		                 ).$view.className += " webix_pivot_readonly"), t.splice(0, 0, {
			                                                                         id: "name",
			                                                                         exportAsTree: !0,
			                                                                         template: "{common.treetable()} #name#",
			                                                                         header: {text: h},
			                                                                         width: this.config.yScaleWidth
		                                                                         }
		                 ), t
	                 },
	                 Sz: function (t) {
		                 var e, i, s, n, r = !1, a = 0, o = [];
		                 for (s = t.length - 1; !r && s;)t[s].header[0].name != t[s - 1].header[0].name && (r = !0, a = s), s--;
		                 var h = 0;
		                 for (s = a; s < t.length; s++) {
			                 if (i = webix.copy(t[s]
				                 ), e = [], r = !0, "sumOnly" == this.config.totalColumn) {
				                 var l = i.id.split(this.$divider), u = l[l.length - 2];
				                 "sum" != u && (r = !1)
			                 }
			                 if (r) {
				                 for (n = h + 1; n < t.length + 1; n += t.length - a)e.push("[$r,:" + n + "]");
				                 i.math = e.join("+"
				                 ), i.format || (i.format = function (t) {
					                 return t && "0" != t ? parseFloat(t).toFixed(3) : t
				                 }), "object" == typeof this.config.totalColumn && webix.extend(i,
				                                                                                this.config.totalColumn,
				                                                                                !0
				                 ), i.id = i.id.replace(i.header[0].name, "$webixtotal"
				                 ), i.header[0].name = "total", i.header[0].text = this.Ku("total"), o.push(i)
			                 }
			                 h++
		                 }
		                 return o = this.Tz(o), t.concat(o)
	                 },
	                 Tz: function (t) {
		                 if (t[0])for (var e = t[0].header.length - 2; e >= 0;) {
			                 for (var i = "", s = 0, n = 0; n < t.length; n++)i != t[n].header[e].text ? (s = n, i = t[n].header[e].text, t[n].header[e].colspan = 1) : (delete t[n].header[e].colspan, t[s].header[e].colspan++);
			                 e--
		                 }
		                 return t
	                 },
	                 $u: function (t) {
		                 var e = [];
		                 for (var i in t) {
			                 var s = !0;
			                 for (var n in t[i]) {
				                 s = !1;
				                 break
			                 }
			                 if (s) {
				                 var r = i.split(this.$divider);
				                 e.push(r.length > 1 ? [
					                        {
						                        name: i,
						                        text: this.Ou(r[1]) + " (" + this.Ku(r[0]) + ")"
					                        }
				                        ] : [{name: i, text: i}]
				                 )
			                 } else {
				                 t[i] = this.$u(t[i]);
				                 for (var a = !1, o = 0; o < t[i].length; o++) {
					                 var h = t[i][o];
					                 h.splice(0, 0, {name: i, text: i}
					                 ), a || (h[0].colspan = t[i].length, a = !0), e.push(h)
				                 }
			                 }
		                 }
		                 return e
	                 },
	                 Yu: function (t, e) {
		                 for (var i = 0; i < e.I.length; i++) {
			                 var s = e.I[i], n = s.split(this.$divider), r = n[n.length - 2];
			                 t[s] = t[s] ? this.operations[r].call(this, t[s]) : "", t[s] = Math.round(1e5 * t[s]) / 1e5
		                 }
		                 return t
	                 },
	                 Zu: function (t, e) {
		                 if (!this.config.min && !this.config.max)return t;
		                 var i = this.config.structure.values;
		                 t.$cellCss || (t.$cellCss = {});
		                 for (var s = 0; s < i.length; s++) {
			                 for (var n = i[s], r = [], a = -99999999, o = [], h = 99999999, l = 0; l < e.I.length; l++) {
				                 var u = e.I[l];
				                 window.isNaN(t[u]) || -1 !== u.indexOf(n.name, this.length - n.name.length
				                 ) && (this.config.max && t[u] > a ? (r = [u], a = t[u]) : t[u] == a && r.push(u
				                 ), this.config.min && t[u] < h ? (o = [u], h = t[u]) : t[u] == h && o.push(u))
			                 }
			                 for (var l = 0; l < o.length; l++)t.$cellCss[o[l]] = "webix_min";
			                 for (var l = 0; l < r.length; l++)t.$cellCss[r[l]] = "webix_max"
		                 }
		                 return t
	                 },
	                 operations: {
		                 sum: function (t) {
			                 for (var e = 0, i = 0; i < t.length; i++) {
				                 var s = t[i];
				                 s = parseFloat(s, 10), window.isNaN(s) || (e += s)
			                 }
			                 return e
		                 }, count: function (t) {return t.length}, max: function (t) {
			                 return 1 == t.length ? t[0] : Math.max.apply(this, t)
		                 }, min: function (t) {return 1 == t.length ? t[0] : Math.min.apply(this, t)}
	                 },
	                 getFields: function () {
		                 for (var t = [], e = {}, i = 0; i < Math.min(this.data.count() || 5
		                 ); i++) {
			                 var s = this.data.getItem(this.data.getIdByIndex(i));
			                 for (var n in s)e[n] || (t.push(n), e[n] = webix.uid())
		                 }
		                 for (var r = this.config.structure, a = {
			                 fields: [],
			                 rows: [],
			                 columns: [],
			                 values: [],
			                 filters: []
		                 }, i = 0; i < (r.filters || []).length; i++) {
			                 var n = r.filters[i];
			                 if (!webix.isUndefined(e[n.name])) {
				                 var o = this.Ou(n.name);
				                 a.filters.push({name: n.name, text: o, type: n.type, value: n.value, id: e[n]})
			                 }
		                 }
		                 for (var i = 0; i < r.rows.length; i++) {
			                 var n = r.rows[i];
			                 webix.isUndefined(e[n]) || (a.rows.push({name: n, text: this.Ou(n), id: e[n]}
			                 ), delete e[n])
		                 }
		                 for (var i = 0; i < r.columns.length; i++) {
			                 var n = "object" == typeof r.columns[i] ? r.columns[i].id || i : r.columns[i];
			                 webix.isUndefined(e[n]) || (a.columns.push({name: n, text: this.Ou(n), id: e[n]}
			                 ), delete e[n])
		                 }
		                 for (var i = 0; i < r.values.length; i++) {
			                 var n = r.values[i];
			                 if (!webix.isUndefined(e[n.name])) {
				                 var o = this.Ou(n.name);
				                 a.values.push({name: n.name, text: o, operation: n.operation, id: e[n.name]})
			                 }
		                 }
		                 for (var i = 0; i < t.length; i++) {
			                 var n = t[i];
			                 webix.isUndefined(e[n]) || a.fields.push({name: n, text: this.Ou(n), id: e[n]})
		                 }
		                 return a
	                 },
	                 Ru: function () {
		                 for (var t = this.config.structure.filters || [], e = 0; e < t.length; e++) {
			                 var i = t[e], s = i.value || "";
			                 webix.isDate(s) ? s = webix.i18n.parseFormatStr(s
			                 ) : "string" == typeof s && (s = (i.value || "").replace(/^\s+|\s+$/g, ""
			                 )), "=" == s.substr(0, 1) ? (i.func = this.filters.equals, s = s.substr(1
			                 )) : ">=" == s.substr(0, 2) ? (i.func = this.filters.more_equals, s = s.substr(2
			                 )) : ">" == s.substr(0, 1) ? (i.func = this.filters.more, s = s.substr(1
			                 )) : "<=" == s.substr(0, 2) ? (i.func = this.filters.less_equals, s = s.substr(2
			                 )) : "<" == s.substr(0, 1) ? (i.func = this.filters.less, s = s.substr(1
			                 )) : i.func = "multiselect" == i.type ? this.filters.multi : "datepicker" == i.type ? function (t, e) {
				                 return t == e
			                 } : this.filters.contains, i.fvalue = s
		                 }
	                 },
	                 Xu: function (t) {
		                 for (var e = this.config.structure.filters || [], i = 0; i < e.length; i++) {
			                 var s = e[i];
			                 if (s.fvalue) {
				                 if (webix.isUndefined(t[s.name]))return !1;
				                 var n = t[s.name].toString().toLowerCase(), r = s.func.call(this.filters, s.fvalue, n);
				                 if (!r)return !1
			                 }
		                 }
		                 return !0
	                 },
	                 filters: {
		                 _u: function (t, e, i) {
			                 return t = window.parseFloat(t, 10), e = window.parseFloat(e, 10), window.isNaN(t
			                 ) ? !0 : window.isNaN(e) ? !1 : i(t, e)
		                 },
		                 contains: function (t, e) {return e.indexOf(t.toString().toLowerCase()) >= 0},
		                 equals: function (t, e) {return this._u(t, e, function (t, e) {return t == e})},
		                 more: function (t, e) {return this._u(t, e, function (t, e) {return e > t})},
		                 more_equals: function (t, e) {return this._u(t, e, function (t, e) {return e >= t})},
		                 less: function (t, e) {
			                 return this._u(t, e, function (t, e) {
				                                return t > e
			                                }
			                 )
		                 },
		                 less_equals: function (t, e) {return this._u(t, e, function (t, e) {return t >= e})},
		                 multi: function (t, e) {
			                 var i = !1;
			                 t = t.split(",");
			                 for (var s = 0; s < t.length; s++)i = i || e.indexOf(t[s].toString().toLowerCase()) >= 0;
			                 return i
		                 }
	                 },
	                 setStructure: function (t) {this.define("structure", t), this.render()},
	                 getStructure: function () {
		                 return this.config.structure
	                 },
	                 getConfigWindow: function () {return this.Ju},
	                 profile_setter: function (t) {
		                 var e = window.console;
		                 t && (this.attachEvent("onBeforeLoad", function () {e.time("data loading")}
		                 ), this.data.attachEvent("onParse",
		                                          function () {e.timeEnd("data loading"), e.time("data parsing")}
		                 ), this.data.attachEvent("onStoreLoad", function () {
			                                          e.timeEnd("data parsing"), e.time("data processing")
		                                          }
		                 ), this.$ready.push(function () {
			                                     this.$$("data").attachEvent("onBeforeRender", function () {
				                                                                 this.count() && (e.timeEnd("data processing"
				                                                                 ), e.time("data rendering"))
			                                                                 }
			                                     ), this.$$("data").attachEvent("onAfterRender", function () {
				                                                                    this.count() && webix.delay(function () {e.timeEnd("data rendering")})
			                                                                    }
			                                     )
		                                     }
		                 ))
	                 }
                 }, webix.IdSpace, webix.ui.layout, webix.DataLoader, webix.EventSystem, webix.Settings
), webix.protoUI({
	                 name: "webix_pivot_config",
	                 $init: function (t) {
		                 this.$view.className += " webix_popup webix_pivot", webix.extend(t, this.defaults
		                 ), webix.extend(t, this.Iu(t)
		                 ), this.$ready.push(this.av)
	                 },
	                 defaults: {
		                 padding: 8,
		                 height: 500,
		                 width: 700,
		                 cancelButtonWidth: 100,
		                 applyButtonWidth: 100,
		                 fieldsColumnWidth: 180,
		                 head: !1,
		                 modal: !0,
		                 move: !0
	                 },
	                 Iu: function (t) {
		                 return {
			                 head: {
				                 view: "toolbar",
				                 cols: [
					                 {
						                 id: "config_title",
						                 view: "label",
						                 label: webix.i18n.pivot.windowTitle || ""
					                 }, {
						                 view: "button",
						                 id: "cancel",
						                 label: webix.i18n.pivot.cancel,
						                 width: t.cancelButtonWidth
					                 }, {
						                 view: "button",
						                 id: "apply",
						                 type: "form",
						                 label: webix.i18n.pivot.apply,
						                 width: t.applyButtonWidth
					                 }
				                 ]
			                 }, body: {
				                 type: "wide", rows: [
					                 {
						                 cols: [
							                 {
								                 width: t.fieldsColumnWidth,
								                 rows: [
									                 {
										                 id: "fieldsHeader",
										                 data: {value: "fields"},
										                 css: "webix_pivot_header_fields",
										                 template: this.bv.popupHeaders,
										                 height: 45
									                 }, {
										                 id: "fields",
										                 view: "list",
										                 scroll: !0,
										                 type: {height: "auto"},
										                 css: "",
										                 drag: !0,
										                 template: "<span class='webix_pivot_list_marker'></span>#text#",
										                 on: {onBeforeDropOut: webix.bind(this.cv, this)}
									                 }
								                 ]
							                 }, {
								                 type: "space", rows: [
									                 {
										                 type: "wide", rows: [
										                 {
											                 css: "webix_pivot_transparent",
											                 borderless: !0,
											                 template: "<div class='webix_pivot_fields_msg'>" + webix.i18n.pivot.windowMessage || "</div>",
											                 height: 25
										                 }, {
											                 type: "wide", cols: [
												                 {
													                 rows: [
														                 {
															                 id: "filtersHeader",
															                 data: {value: "filters", icon: "filter"},
															                 template: this.bv.popupIconHeaders,
															                 css: "webix_pivot_popup_title",
															                 height: 40
														                 }, {
															                 id: "filters",
															                 view: "list",
															                 scroll: !1,
															                 drag: !0,
															                 css: "webix_pivot_values",
															                 template: function (t) {
																                 return t.type = t.type || "select", "<a class='webix_pivot_link'>" + t.text + " <span class='webix_link_selection'>" + t.type + "</span></a> "
															                 },
															                 type: {height: 35},
															                 onClick: {
																                 webix_pivot_link: webix.bind(this.dv,
																                                              this
																                 )
															                 },
															                 on: {
																                 onBeforeDrop: webix.bind(this.Uz, this
																                 ),
																                 onBeforeDropOut: webix.bind(this.Vz,
																                                             this
																                 )
															                 }
														                 }
													                 ]
												                 }, {
													                 rows: [
														                 {
															                 id: "columnsHeader",
															                 data: {value: "columns", icon: "columns"},
															                 template: this.bv.popupIconHeaders,
															                 css: "webix_pivot_popup_title",
															                 height: 40
														                 }, {
															                 id: "columns",
															                 view: "list",
															                 scroll: !1,
															                 drag: !0,
															                 type: {height: 35},
															                 template: "#text#"
														                 }
													                 ]
												                 }
											                 ]
										                 }, {
											                 type: "wide",
											                 cols: [
												                 {
													                 rows: [
														                 {
															                 id: "rowsHeader",
															                 data: {value: "rows", icon: "list"},
															                 template: this.bv.popupIconHeaders,
															                 css: "webix_pivot_popup_title",
															                 height: 40
														                 }, {
															                 id: "rows",
															                 view: "list",
															                 scroll: !1,
															                 drag: !0,
															                 template: "#text#",
															                 type: {height: 35}
														                 }
													                 ]
												                 }, {
													                 rows: [
														                 {
															                 id: "valuesHeader",
															                 data: {
																                 value: "values",
																                 icon: !1,
																                 iconContent: "<b>&Sigma;</b>"
															                 },
															                 template: this.bv.popupIconHeaders,
															                 css: "webix_pivot_popup_title",
															                 height: 40
														                 }, {
															                 id: "values",
															                 view: "list",
															                 scroll: !0,
															                 drag: !0,
															                 css: "webix_pivot_values",
															                 type: {height: "auto"},
															                 template: webix.bind(this.ev, this),
															                 onClick: {
																                 webix_pivot_link: webix.bind(this.fv,
																                                              this
																                 ),
																                 webix_pivot_plus: webix.bind(this.gv,
																                                              this
																                 ),
																                 webix_pivot_minus: webix.bind(this.hv,
																                                               this
																                 )
															                 },
															                 on: {
																                 onBeforeDrop: webix.bind(this.iv, this
																                 ),
																                 onBeforeDropOut: webix.bind(this.cv,
																                                             this
																                 )
															                 }
														                 }
													                 ]
												                 }
											                 ]
										                 }
									                 ]
									                 }
								                 ]
							                 }
						                 ]
					                 }
				                 ]
			                 }
		                 }
	                 },
	                 bv: {
		                 popupHeaders: function (t) {return webix.i18n.pivot[t.value]},
		                 popupIconHeaders: function (t) {return t.icon ? "<span class='webix_pivot_header_icon webix_icon fa-" + t.icon + "'></span>" + webix.i18n.pivot[t.value] : "<span class='webix_pivot_header_icon'>" + t.iconContent + "</span>" + webix.i18n.pivot[t.value]}
	                 },
	                 cv: function (t) {
		                 if (t.to != t.from) {
			                 var e = t.source[0];
			                 t.from == this.$$("values") ? this.$$("fields").getItem(e) && this.$$("fields").remove(e
			                 ) : t.from == this.$$("fields") && t.to != this.$$("values") && this.$$("values").getItem(
				                 e
			                 ) && this.$$("values").remove(e)
		                 }
	                 },
	                 iv: function (t) {
		                 if (t.to && t.from != t.to) {
			                 var e = t.source, i = t.from.getItem(e);
			                 if (t.from == this.$$("fields"))return t.to.getItem(e) ? this.gv({}, e) : t.to.add(
				                 webix.copy(i), t.index
			                 ), !1;
			                 this.$$("fields").getItem(e) || this.$$("fields").add(webix.copy(i))
		                 }
		                 return !0
	                 },
	                 Uz: function (t) {
		                 if (t.from != t.to) {
			                 var e = webix.copy(t.from.getItem(t.start)), i = e.name;
			                 delete e.id;
			                 var s = !1;
			                 return this.$$("filters").data.each(function (t) {t.name == i && (s = !0)}), s || t.to.add(
				                 e
			                 ), !1
		                 }
		                 return !1
	                 },
	                 Vz: function (t) {
		                 if (t.from && t.to && t.from != t.to)for (var e = ["fields", "rows", "columns"], i = t.from.getItem(
			                 t.start
		                 ).name, s = 0; s < e.length; s++) {
			                 var n = null;
			                 this.$$(e[s]).data.each(function (t) {t.name == i && (n = t)}), n && this.$$(e[s]).remove(
				                 n.id
			                 )
		                 }
		                 return !0
	                 },
	                 av: function () {
		                 this.attachEvent("onItemClick", function (t) {
			                                  var e = this.innerId(t);
			                                  ("cancel" == e || "apply" == e) && (this.callEvent("on" + e, [this.getStructure()]
			                                  ), this.hide())
		                                  }
		                 )
	                 },
	                 ev: function (t) {
		                 t.operation = t.operation || ["sum"], webix.isArray(t.operation
		                 ) || (t.operation = [t.operation]);
		                 for (var e = [], i = webix.$$(this.config.pivot).Ku, s = 0; s < t.operation.length; s++) {
			                 var n = "<span class='webix_pivot_link' webix_operation='" + s + "'>";
			                 n += "<span>" + t.text + "</span>", n += "<span class='webix_link_selection'>" + i(
					                 t.operation[s]
				                 ) + "</span>", n += "<span class='webix_pivot_minus webix_icon fa-times'></span>", n += "</span>", e.push(
				                 n
			                 )
		                 }
		                 return e.join(" ")
	                 },
	                 fv: function (t, e) {
		                 var i = {
			                 view: "webix_pivot_popup",
			                 autofit: !0,
			                 width: 150,
			                 data: this.config.operations || []
		                 }, s = webix.ui(i);
		                 s.show(t), s.attachEvent("onHide", webix.bind(function () {
			                                                               var i = webix.html.locate(t, "webix_operation"), n = s.getSelected();
			                                                               null !== n && (this.$$("values").getItem(e).operation[i] = n.name, this.$$("values"
			                                                               ).updateItem(e)), s.close()
		                                                               }, this
		                                          )
		                 )
	                 },
	                 gv: function (t, e) {
		                 var i = this.$$("values").getItem(e);
		                 i.operation.push("sum"), this.$$("values").updateItem(e), webix.delay(function () {
			                                                                                       for (var t = i.operation.length - 1, s = this.$$("values").getItemNode(e
			                                                                                       ).childNodes, n = null, r = 0; r < s.length; r++)if (n = s[r], n.getAttribute) {
				                                                                                       var a = n.getAttribute("webix_operation");
				                                                                                       if (!webix.isUndefined(a) && a == t)break
			                                                                                       }
			                                                                                       null !== n && this.fv(n, e)
		                                                                                       }, this
		                 )
	                 },
	                 hv: function (t, e) {
		                 var i = webix.html.locate(t, "webix_operation"), s = this.$$("values"
		                 ).getItem(e);
		                 return s.operation.length > 1 ? (s.operation.splice(i, 1), this.$$("values").updateItem(e
		                 )) : this.$$("values").remove(e), !1
	                 },
	                 dv: function (t, e) {
		                 var i = webix.$$(this.config.pivot).Ku, s = {
			                 view: "webix_pivot_popup",
			                 autofit: !0,
			                 height: 150,
			                 width: 150,
			                 data: [
				                 {name: "datepicker", title: i("date")}, {
					                 name: "multiselect",
					                 title: i("multiselect")
				                 }, {name: "select", title: i("select")}, {name: "text", title: i("text")}
			                 ]
		                 }, n = webix.ui(s);
		                 n.show(t), n.attachEvent("onHide", webix.bind(function () {
			                                                               var t = n.getSelected();
			                                                               if (null !== t) {
				                                                               var i = this.$$("filters").getItem(e);
				                                                               i.type = t.name, this.$$("filters").updateItem(e)
			                                                               }
			                                                               n.close()
		                                                               }, this
		                                          )
		                 )
	                 },
	                 data_setter: function (t) {
		                 this.$$("fields").clearAll(), this.$$("fields").parse(t.fields), this.$$("fields").filter(
			                 function (t) {
				                 return "id" != t.name
			                 }
		                 ), this.$$("filters").clearAll(), this.$$("filters").parse(t.filters), this.$$("columns"
		                 ).clearAll(), this.$$("columns").parse(t.columns), this.$$("rows").clearAll(), this.$$("rows"
		                 ).parse(t.rows), this.$$("values").clearAll(), this.$$("values").parse(t.values)
	                 },
	                 setStructure: function (t) {
		                 this.define("structure", t), this.render()
	                 },
	                 getStructure: function () {
		                 var t = {rows: [], columns: [], values: [], filters: []}, e = this.$$("rows");
		                 e.data.each(function (e) {t.rows.push(e.name)});
		                 var i = this.$$("columns");
		                 i.data.each(function (e) {t.columns.push(e.name)});
		                 var s = this.$$("values");
		                 s.data.each(function (e) {t.values.push(e)});
		                 var n = this.$$("filters");
		                 return n.data.each(function (e) {t.filters.push(e)}), t
	                 }
                 }, webix.ui.window, webix.IdSpace
), webix.protoUI({
	                 name: "webix_pivot_popup",
	                 wg: null,
	                 $init: function (t) {webix.extend(t, this.Iu(t)), this.$ready.push(this.av)},
	                 Iu: function (t) {
		                 return {
			                 body: {
				                 id: "list",
				                 view: "list",
				                 scroll: !1,
				                 borderless: !0,
				                 autoheight: !0,
				                 template: "#title#",
				                 data: t.data
			                 }
		                 }
	                 },
	                 av: function () {
		                 this.attachEvent("onItemClick",
		                                  function (t) {this.wg = this.$eventSource.getItem(t), this.hide()}
		                 )
	                 },
	                 getSelected: function () {return this.wg}
                 }, webix.ui.popup, webix.IdSpace
), webix.i18n.pivot = webix.extend(webix.i18n.pivot || {}, {
	                                   apply: "Apply",
	                                   bar: "Bar",
	                                   cancel: "Cancel",
	                                   date: "date",
	                                   groupBy: "Group By",
	                                   chartType: "Chart type",
	                                   count: "count",
	                                   fields: "Fields",
	                                   filters: "Filters",
	                                   line: "Line",
	                                   max: "max",
	                                   min: "min",
	                                   multiselect: "multi-select",
	                                   operationNotDefined: "Operation is not defined",
	                                   layoutIncorrect: "pivotLayout should be an Array instance",
	                                   popupHeader: "Pivot Settings",
	                                   radar: "Radar",
	                                   radarArea: "Area Radar",
	                                   select: "select",
	                                   settings: "Settings",
	                                   stackedBar: "Stacked Bar",
	                                   sum: "sum",
	                                   text: "text",
	                                   values: "Values",
	                                   valuesNotDefined: "Values or Group field are not defined",
	                                   windowTitle: "Pivot Configuration",
	                                   windowMessage: "move fields into a required sector"
                                   }
), webix.protoUI({
	                 name: "pivot-chart",
	                 version: "3.1.2",
	                 defaults: {
		                 fieldMap: {},
		                 rows: [],
		                 filterLabelAlign: "right",
		                 filterWidth: 300,
		                 filterMinWidth: 180,
		                 editButtonWidth: 110,
		                 filterLabelWidth: 100,
		                 chartType: "bar",
		                 color: "#36abee",
		                 chart: {},
		                 singleLegendItem: 1,
		                 palette: [["#e33fc7", "#a244ea", "#476cee", "#36abee", "#58dccd", "#a7ee70"], ["#d3ee36", "#eed236", "#ee9336", "#ee4339", "#595959", "#b85981"], ["#c670b8", "#9984ce", "#b9b9e2", "#b0cdfa", "#a0e4eb", "#7faf1b"], ["#b4d9a4", "#f2f79a", "#ffaa7d", "#d6806f", "#939393", "#d9b0d1"], ["#780e3b", "#684da9", "#242464", "#205793", "#5199a4", "#065c27"], ["#54b15a", "#ecf125", "#c65000", "#990001", "#363636", "#800f3e"]]
	                 },
	                 templates: {
		                 groupNameToStr: function (t, e) {
			                 return t + "_" + e
		                 },
		                 groupNameToObject: function (t) {
			                 var e = t.split("_");
			                 return {name: e[0], operation: e[1]}
		                 },
		                 seriesTitle: function (t, e) {
			                 var i = this.config.fieldMap[t.name] || this.Wz(t.name
				                 ), s = webix.isArray(t.operation) ? t.operation[e] : t.operation;
			                 return i + " ( " + (webix.i18n.pivot[s] || s) + ")"
		                 }
	                 },
	                 templates_setter: function (t) {
		                 "object" == typeof t && webix.extend(this.templates, t)
	                 },
	                 chartMap: {
		                 bar: function (t) {return {border: 0, alpha: 1, radius: 0, color: t}},
		                 line: function (t) {
			                 return {
				                 alpha: 1,
				                 item: {borderColor: t, color: t},
				                 line: {color: t, width: 2}
			                 }
		                 },
		                 radar: function (t) {
			                 return {
				                 alpha: 1,
				                 fill: !1,
				                 disableItems: !0,
				                 item: {borderColor: t, color: t},
				                 line: {color: t, width: 2}
			                 }
		                 }
	                 },
	                 chartMap_setter: function (t) {
		                 "object" == typeof t && webix.extend(this.chartMap, t, !0)
	                 },
	                 $init: function (t) {
		                 t.structure || (t.structure = {}), webix.extend(t.structure,
		                                                                 {groupBy: "", values: [], filters: []}
		                 ), this.$view.className += " webix_pivot_chart", webix.extend(t,
		                                                                               {editButtonWidth: this.defaults.editButtonWidth}
		                 ), webix.extend(t, this.getUI(t)), this.$ready.push(webix.bind(function () {
			                                                                                webix.delay(this.render, this)
		                                                                                }, this
		                                                                     )
		                 ), this.data.attachEvent("onStoreUpdated", webix.bind(
			                 function () {this.$$("chart") && this.render(this, arguments)}, this
		                                          )
		                 )
	                 },
	                 getUI: function (t) {
		                 var e = [];
		                 e.push({id: "filters", hidden: !0, cols: []}), t.readonly || e.push({}, {
			                                                                                     id: "edit",
			                                                                                     view: "icon",
			                                                                                     type: "iconButton",
			                                                                                     align: "right",
			                                                                                     icon: "pencil-square-o",
			                                                                                     inputWidth: t.editButtonWidth,
			                                                                                     tooltip: this.jv("settings"),
			                                                                                     click: webix.bind(this.configure, this)
		                                                                                     }
		                 );
		                 var i = {
			                 paddingY: 10,
			                 paddingX: 5,
			                 margin: 10,
			                 maxHeight: 5,
			                 id: "toolbar",
			                 cols: e
		                 }, s = {id: "bodyLayout", type: "line", margin: 10, cols: [{id: "chart", view: "chart"}]};
		                 return {type: "clean", rows: [i, s]}
	                 },
	                 configure: function () {
		                 if (!this.pivotPopup) {
			                 var t = {view: "webix_pivot_chart_config", operations: [], pivot: this.config.id};
			                 webix.extend(t, this.config.popup || {}), this.pivotPopup = webix.ui(t), this.callEvent(
				                 "onPopup", [this.pivotPopup]
			                 ), this.pivotPopup.attachEvent("onApply", webix.bind(function (t) {
				                                                                      this.config.chartType = this.pivotPopup.$$("chartType") ? this.pivotPopup.$$(
					                                                                      "chartType"
				                                                                      ).getValue() : "bar", this.config.chart.scale = this.pivotPopup.$$("logScale"
				                                                                      ).getValue() ? "logarithmic" : "linear", webix.extend(this.config.structure, t, !0
				                                                                      ), this.render()
			                                                                      }, this
			                                                )
			                 )
		                 }
		                 var e = [];
		                 for (var i in this.operations)e.push({name: i, title: this.jv(i)});
		                 this.pivotPopup.kv = this.kv, this.pivotPopup.define("operations", e);
		                 var s = webix.html.offset(this.$$("chart").getNode());
		                 this.pivotPopup.setPosition(s.x + 10, s.y + 10), this.pivotPopup.define("data",
		                                                                                         this.getFields()
		                 ), this.pivotPopup.lv = this.pivotPopup.show()
	                 },
	                 render: function () {
		                 var t = this.mv();
		                 t.length ? (this.$$("filters").show(), this.$$("filters").define("cols", t
		                 ), this.nv()) : this.$$("filters").hide(), this.ov(), this.pv(), this.qv()
	                 },
	                 pv: function () {
		                 for (var t = this.config, e = t.structure.values, i = 0; i < e.length; i++)e[i].operation = e[i].operation || ["sum"], webix.isArray(
			                 e[i].operation
		                 ) || (e[i].operation = [e[i].operation]);
		                 var s = this.config.chartType || "bar", n = this.chartMap[s], r = {
			                 type: n && n("").type ? n("").type : s,
			                 xAxis: webix.extend({template: "#id#"}, t.chart.xAxis || {}),
			                 yAxis: webix.extend({}, t.chart.yAxis || {})
		                 };
		                 webix.extend(r, t.chart), r.padding || (r.padding = {top: 17});
		                 var a = this.rv();
		                 r.series = a.series, r.legend = !1, (t.singleLegendItem || this.kv > 1) && (r.legend = a.legend), r.scheme = {
			                 $group: this.sv,
			                 $sort: {by: "id"}
		                 }, this.$$("chart").removeAllSeries();
		                 for (var o in r)this.$$("chart").define(o, r[o])
	                 },
	                 jv: function (t) {return webix.i18n.pivot[t] || t},
	                 Wz: function (t) {return t.charAt(0).toUpperCase() + t.slice(1)},
	                 tv: function (t, e) {return this.config.fieldMap[t] || (e ? this.Wz(t) : t)},
	                 mv: function () {
		                 for (var t = this.config.structure.filters || [], e = [], i = 0; i < t.length; i++) {
			                 var s = t[i], n = {
				                 value: s.value,
				                 label: this.tv(s.name, !0),
				                 field: s.name,
				                 view: s.type,
				                 stringResult: !0,
				                 labelAlign: this.config.filterLabelAlign,
				                 labelWidth: this.config.filterLabelWidth,
				                 minWidth: this.config.filterMinWidth,
				                 maxWidth: this.config.filterWidth
			                 };
			                 ("select" == s.type || "multiselect" == s.type) && (n.options = this.uv(s.name
			                 ), "multiselect" == s.type && n.options.shift()), e.push(n)
		                 }
		                 return e
	                 },
	                 uv: function (t) {
		                 var e = [{value: "", id: ""}], i = this.data.pull, s = {};
		                 for (var n in i) {
			                 var r = i[n][t];
			                 webix.isUndefined(r) || s[r] || (e.push({value: r, id: r}), s[r] = !0)
		                 }
		                 return e.sort(function (t, e) {
			                               var i = t.value, s = e.value;
			                               return s ? i ? (i = i.toString().toLowerCase(), s = s.toString().toLowerCase(), i > s ? 1 : s > i ? -1 : 0) : -1 : 1
		                               }
		                 ), e
	                 },
	                 qv: function () {
		                 this.ov(), this.data.silent(function () {this.data.filter(webix.bind(this.vv, this))}, this
		                 ), this.$$("chart").data.silent(function () {this.$$("chart").clearAll()}, this), this.$$(
			                 "chart"
		                 ).parse(this.data.getRange())
	                 },
	                 nv: function () {
		                 var t = this.$$("filters");
		                 t.reconstruct();
		                 for (var e = t.getChildViews(), i = this, s = 0; s < e.length; s++) {
			                 var n = e[s];
			                 "select" == n.name || "multiselect" == n.name || "datepicker" == n.name ? n.attachEvent(
				                 "onChange", function (t) {i.wv(this.config.field, t)}
			                 ) : webix.isUndefined(n.getValue) || n.attachEvent("onTimedKeyPress", function () {
				                                                                    i.wv(this.config.field, this.getValue())
			                                                                    }
			                 )
		                 }
	                 },
	                 wv: function (t, e) {
		                 for (var i = this.config.structure.filters, s = 0; s < i.length; s++)if (i[s].name == t)return i[s].value = e, this.qv(), !0;
		                 return !1
	                 },
	                 groupNameToStr: function (t) {return t.name + "_" + t.operation},
	                 groupNameToObject: function (t) {
		                 var e = t.split("_");
		                 return {name: e[0], operation: e[1]}
	                 },
	                 rv: function () {
		                 var t, e, i, s, n, r = {}, a = [], o = this.config.structure.values;
		                 for (i = {valign: "middle", align: "right", width: 140, layout: "y"}, webix.extend(i,
		                                                                                                    this.config.chart.legend || {},
		                                                                                                    !0
		                 ), i.values = [], i.marker || (i.marker = {}), i.marker.type = "line" == this.config.chartType ? "item" : "s", this.series_names = [], this.kv = 0, t = 0; t < o.length; t++)for (webix.isArray(
			                 o[t].operation
		                 ) || (o[t].operation = [o[t].operation]), webix.isArray(o[t].color
		                 ) || (o[t].color = [o[t].color || this.xv(this.kv)]), e = 0; e < o[t].operation.length; e++) {
			                 s = this.templates.groupNameToStr(o[t].name, o[t].operation[e]), this.series_names.push(s
			                 ), o[t].color[e] || (o[t].color[e] = this.xv(this.kv));
			                 var h = o[t].color[e], l = this.chartMap[this.config.chartType](h) || {};
			                 l.value = "#" + s + "#", l.tooltip = {
				                 template: webix.bind(function (t) {return t[this].toFixed(3)}, s)
			                 }, a.push(l), n = this.templates.seriesTitle.call(this, o[t], e), i.values.push(
				                 {text: n, color: h}
			                 ), r[s] = [o[t].name, o[t].operation[e]], this.kv++
		                 }
		                 return this.sv = {}, o.length && (this.sv = webix.copy(
			                 {by: this.config.structure.groupBy, map: r}
		                 )), {series: a, legend: i}
	                 },
	                 xv: function (t) {
		                 var e = this.config.palette, i = t / e[0].length;
		                 i = i > e.length ? 0 : parseInt(i, 10);
		                 var s = t % e[0].length;
		                 return e[i][s]
	                 },
	                 yv: function () {
		                 var t, e, i, s = this.config.structure.values;
		                 for (e = {valign: "middle", align: "right", width: 140, layout: "y"}, webix.extend(e,
		                                                                                                    this.config.chart.legend || {},
		                                                                                                    !0
		                 ), e.values = [], e.marker || (e.marker = {}), e.marker.type = "line" == this.config.chartType ? "item" : "s", t = 0; t < s.length; t++)i = this.templates.seriesTitle.call(
			                 this, s[t]
		                 ), e.values.push({text: i, color: s[t].color});
		                 return e
	                 },
	                 operations: {sum: 1, count: 1, max: 1, min: 1},
	                 addGroupMethod: function (t, e) {this.operations[t] = 1, e && (webix.GroupMethods[t] = e)},
	                 removeGroupMethod: function (t) {delete this.operations[t]},
	                 groupMethods_setter: function (t) {
		                 for (var e in t)t.hasOwnProperty(e) && this.addGroupMethod(e, t[e])
	                 },
	                 getFields: function () {
		                 var t, e = [], i = {};
		                 for (t = 0; t < Math.min(this.data.count() || 5); t++) {
			                 var s = this.data.getItem(this.data.getIdByIndex(t));
			                 for (var n in s)i[n] || (e.push(n), i[n] = webix.uid())
		                 }
		                 var r = this.config.structure, a = {
			                 fields: [],
			                 groupBy: [],
			                 values: [],
			                 filters: []
		                 }, o = "object" == typeof r.groupBy ? r.groupBy[0] : r.groupBy;
		                 webix.isUndefined(i[o]) || (a.groupBy.push({name: o, text: this.tv(o), id: i[o]}
		                 ), delete i[o]);
		                 var h = {};
		                 for (t = 0; t < r.values.length; t++) {
			                 var o = r.values[t];
			                 if (!webix.isUndefined(i[o.name])) {
				                 var l = this.tv(o.name);
				                 if (webix.isUndefined(h[o.name]))h[o.name] = a.values.length, a.values.push({
					                                                                                             name: o.name,
					                                                                                             text: l,
					                                                                                             operation: o.operation,
					                                                                                             color: o.color || [
						                                                                                             this.xv(
							                                                                                             t
						                                                                                             )
					                                                                                             ],
					                                                                                             id: i[o.name]
				                                                                                             }
				                 ); else {
					                 var u = a.values[h[o.name]];
					                 u.operation = u.operation.concat(o.operation), u.color = u.color.concat(
						                 o.color || [this.xv(t)]
					                 )
				                 }
			                 }
		                 }
		                 for (t = 0; t < (r.filters || []).length; t++) {
			                 var o = r.filters[t];
			                 if (!webix.isUndefined(i[o.name])) {
				                 var l = this.tv(o.name);
				                 a.filters.push({name: o.name, text: l, type: o.type, value: o.value, id: i[o]}
				                 ), delete i[o.name]
			                 }
		                 }
		                 for (t = 0; t < e.length; t++) {
			                 var o = e[t];
			                 webix.isUndefined(i[o]) || a.fields.push({name: o, text: this.tv(o), id: i[o]})
		                 }
		                 return a
	                 },
	                 ov: function () {
		                 for (var t = this.config.structure.filters || [], e = 0; e < t.length; e++) {
			                 var i = t[e], s = i.value || "";
			                 webix.isDate(s) ? s = webix.i18n.parseFormatStr(s
			                 ) : "string" == typeof s && (s = s.trim()), "=" == s.substr(0, 1
			                 ) ? (i.func = this.filters.equals, s = s.substr(1)) : ">=" == s.substr(0, 2
			                 ) ? (i.func = this.filters.more_equals, s = s.substr(2)) : ">" == s.substr(0, 1
			                 ) ? (i.func = this.filters.more, s = s.substr(1)) : "<=" == s.substr(0, 2
			                 ) ? (i.func = this.filters.less_equals, s = s.substr(2)) : "<" == s.substr(0, 1
			                 ) ? (i.func = this.filters.less, s = s.substr(1)) : s.indexOf("..."
			                 ) > 0 ? (i.func = this.filters.range, s = s.split("...")) : s.indexOf(".."
			                 ) > 0 ? (i.func = this.filters.range_inc, s = s.split(".."
			                 )) : i.func = "multiselect" == i.type ? this.filters.multi : "datepicker" == i.type ? function (t, e) {
				                 return t == e
			                 } : this.filters.contains, i.fvalue = s
		                 }
	                 },
	                 vv: function (t) {
		                 for (var e = this.config.structure.filters || [], i = 0; i < e.length; i++) {
			                 var s = e[i];
			                 if (s.fvalue) {
				                 if (webix.isUndefined(t[s.name]))return !1;
				                 var n = t[s.name].toString().toLowerCase(), r = s.func.call(this.filters, s.fvalue, n);
				                 if (!r)return !1
			                 }
		                 }
		                 return !0
	                 },
	                 filters: {
		                 _u: function (t, e, i) {
			                 if ("object" == typeof t) {
				                 for (var s = 0; s < t.length; s++)if (t[s] = window.parseFloat(t[s], 10), window.isNaN(
						                 t[s]
					                 ))return !0
			                 } else if (t = window.parseFloat(t, 10), window.isNaN(t))return !0;
			                 return window.isNaN(e) ? !1 : i(t, e)
		                 },
		                 contains: function (t, e) {return e.indexOf(t.toString().toLowerCase()) >= 0},
		                 equals: function (t, e) {return this._u(t, e, function (t, e) {return t == e})},
		                 more: function (t, e) {return this._u(t, e, function (t, e) {return e > t})},
		                 more_equals: function (t, e) {
			                 return this._u(t, e, function (t, e) {
				                                return e >= t
			                                }
			                 )
		                 },
		                 less: function (t, e) {return this._u(t, e, function (t, e) {return t > e})},
		                 less_equals: function (t, e) {return this._u(t, e, function (t, e) {return t >= e})},
		                 range: function (t, e) {return this._u(t, e, function (t, e) {return e < t[1] && e >= t[0]})},
		                 range_inc: function (t, e) {
			                 return this._u(t, e, function (t, e) {
				                                return e <= t[1] && e >= t[0]
			                                }
			                 )
		                 },
		                 multi: function (t, e) {
			                 var i = !1;
			                 t = t.split(",");
			                 for (var s = 0; s < t.length; s++)i = i || e.indexOf(t[s].toString().toLowerCase()) >= 0;
			                 return i
		                 }
	                 },
	                 getStructure: function () {return this.config.structure},
	                 getConfigWindow: function () {return this.Ju}
                 }, webix.IdSpace, webix.ui.layout, webix.DataLoader, webix.EventSystem, webix.Settings
), webix.protoUI({
	                 name: "webix_pivot_chart_config",
	                 $init: function (t) {
		                 this.$view.className += " webix_pivot_chart_popup", webix.extend(t, this.defaults
		                 ), webix.extend(t, this.zv(t)
		                 ), this.$ready.push(this.Av)
	                 },
	                 defaults: {
		                 padding: 8,
		                 height: 500,
		                 width: 650,
		                 head: !1,
		                 modal: !0,
		                 move: !0,
		                 chartTypeLabelWidth: 80,
		                 chartTypeWidth: 250,
		                 cancelButtonWidth: 100,
		                 applyButtonWidth: 100,
		                 fieldsColumnWidth: 280
	                 },
	                 zv: function (t) {
		                 var e = [], i = webix.$$(t.pivot), s = i.chartMap;
		                 for (var n in s)e.push({id: n, value: i.jv(n)});
		                 return {
			                 head: {
				                 view: "toolbar",
				                 cols: [
					                 {
						                 id: "config_title",
						                 view: "label",
						                 label: webix.i18n.pivot.windowTitle
					                 }, {
						                 view: "button",
						                 id: "cancel",
						                 label: i.jv("cancel"),
						                 width: t.cancelButtonWidth
					                 }, {
						                 view: "button",
						                 id: "apply",
						                 type: "form",
						                 css: "webix_pivot_apply",
						                 label: i.jv("apply"),
						                 width: t.applyButtonWidth
					                 }
				                 ]
			                 }, body: {
				                 type: "space", rows: [
					                 {
						                 type: "wide", cols: [
						                 {
							                 width: t.fieldsColumnWidth,
							                 rows: [
								                 {
									                 id: "fieldsHeader",
									                 css: "webix_pivot_header_fields",
									                 template: "<div class='webix_pivot_fields_msg'>" + webix.i18n.pivot.windowMessage || "</div>",
									                 height: 40
								                 }, {
									                 id: "fields",
									                 view: "list",
									                 type: {height: "auto"},
									                 drag: !0,
									                 template: "<span class='webix_pivot_list_marker'></span>#text#",
									                 on: {
										                 onBeforeDrop: webix.bind(this.Bv, this),
										                 onBeforeDropOut: webix.bind(this.Cv, this),
										                 onBeforeDrag: webix.bind(this.Dv, this)
									                 }
								                 }
							                 ]
						                 }, {
							                 type: "wide", rows: [
								                 {
									                 rows: [
										                 {
											                 id: "filtersHeader",
											                 data: {value: "filters", icon: "filter"},
											                 template: this.bv.popupIconHeaders,
											                 css: "webix_pivot_popup_title",
											                 height: 40
										                 }, {
											                 id: "filters",
											                 view: "list",
											                 scroll: !0,
											                 gravity: 2,
											                 drag: !0,
											                 css: "webix_pivot_values",
											                 template: function (t) {
												                 return t.type = t.type || "select", "<div class='webix_pivot_link'>" + t.text + "<div class='webix_link_selection filter'>" + i.jv(
													                 t.type
												                 ) + "</div></div> "
											                 },
											                 type: {height: 35},
											                 onClick: {webix_link_selection: webix.bind(this.Ev, this)},
											                 on: {onBeforeDrag: webix.bind(this.Dv, this)}
										                 }
									                 ]
								                 }, {
									                 rows: [
										                 {
											                 id: "valuesHeader",
											                 data: {value: "values", icon: "bar-chart"},
											                 template: this.bv.popupIconHeaders,
											                 css: "webix_pivot_popup_title",
											                 height: 40
										                 }, {
											                 id: "values",
											                 view: "list",
											                 scroll: !0,
											                 gravity: 3,
											                 drag: !0,
											                 css: "webix_pivot_values",
											                 type: {height: "auto"},
											                 template: webix.bind(this.ev, this),
											                 onClick: {
												                 webix_link_title: webix.bind(this.fv, this),
												                 webix_link_selection: webix.bind(this.fv, this),
												                 webix_color_selection: webix.bind(this.Fv, this),
												                 webix_pivot_minus: webix.bind(this.hv, this)
											                 },
											                 on: {
												                 onBeforeDrop: webix.bind(this.Gv, this),
												                 onBeforeDropOut: webix.bind(this.Cv, this),
												                 onBeforeDrag: webix.bind(this.Dv, this)
											                 }
										                 }
									                 ]
								                 }, {
									                 rows: [
										                 {
											                 id: "groupHeader",
											                 data: {value: "groupBy", icon: "sitemap"},
											                 template: this.bv.popupIconHeaders,
											                 css: "webix_pivot_popup_title",
											                 height: 40
										                 }, {
											                 id: "groupBy",
											                 view: "list",
											                 yCount: 1,
											                 scroll: !1,
											                 drag: !0,
											                 type: {height: 35},
											                 template: "<a class='webix_pivot_link'>#text#</a> ",
											                 on: {
												                 onBeforeDrop: webix.bind(this.Hv, this),
												                 onBeforeDrag: webix.bind(this.Dv, this)
											                 }
										                 }
									                 ]
								                 }
							                 ]
						                 }
					                 ]
					                 }, {
						                 borderless: !0,
						                 css: "webix_pivot_footer",
						                 cols: [
							                 {
								                 view: "checkbox",
								                 id: "logScale",
								                 value: i.config.chart.scale && "logarithmic" == i.config.chart.scale,
								                 label: webix.i18n.pivot.logScale,
								                 labelWidth: t.logScaleLabelWidth,
								                 width: t.logScaleLabelWidth + 20
							                 }, {}, {
								                 view: "select",
								                 id: "chartType",
								                 value: i.config.chartType,
								                 label: webix.i18n.pivot.chartType,
								                 options: e,
								                 labelWidth: t.chartTypeLabelWidth,
								                 width: t.chartTypeWidth
							                 }
						                 ]
					                 }
				                 ]
			                 }
		                 }
	                 },
	                 bv: {
		                 popupHeaders: function (t) {return webix.i18n.pivot[t.value]},
		                 popupIconHeaders: function (t) {return "<span class='webix_pivot_header_icon webix_icon fa-" + t.icon + "'></span>" + webix.i18n.pivot[t.value]}
	                 },
	                 Dv: function () {webix.callEvent("onClick", [])},
	                 Bv: function (t) {
		                 if (t.from == this.$$("values")) {
			                 var e = t.source[0];
			                 return this.$$("values").getItem(e) && this.$$("values").remove(e), !1
		                 }
		                 return !0
	                 },
	                 Cv: function (t) {
		                 if (t.to != t.from) {
			                 var e = t.source[0];
			                 t.from == this.$$("values") && t.to != this.$$("fields") ? (delete this.$$("values"
			                 ).getItem(e).operation, delete this.$$("values").getItem(e).color, this.$$("fields"
			                 ).getItem(e) && this.$$("fields").remove(e)) : t.from == this.$$("fields"
			                 ) && t.to != this.$$("values") && this.$$("values").getItem(e) && this.$$("values").remove(
				                 e
			                 )
		                 }
	                 },
	                 Gv: function (t) {
		                 if (t.to && t.from != t.to) {
			                 var e = t.source, i = t.from.getItem(e);
			                 if (t.from == this.$$("fields"))return t.to.getItem(e) ? (this.gv({}, e
			                 ), this.kv++) : (i = webix.copy(i), t.to.add(webix.copy(i), t.index), this.kv++), !1;
			                 this.$$("fields").getItem(e) || this.$$("fields").add(webix.copy(i)), this.Iv = !0
		                 }
		                 return !0
	                 },
	                 Hv: function () {
		                 if (this.$$("groupBy").data.order.length) {
			                 var t = this.$$("groupBy"
			                 ).getFirstId(), e = webix.copy(this.$$("groupBy").getItem(t));
			                 this.$$("groupBy").remove(t), this.$$("fields").add(e)
		                 }
		                 return !0
	                 },
	                 Av: function () {
		                 this.attachEvent("onItemClick", function (t) {
			                                  if ("button" == this.$eventSource.name) {
				                                  var e = this.getStructure();
				                                  "apply" != this.innerId(t) || e.values.length && e.groupBy ? (this.callEvent(
					                                  "on" + this.innerId(t), [e]
				                                  ), this.hide()) : webix.alert(webix.i18n.pivot.valuesNotDefined)
			                                  }
		                                  }
		                 )
	                 },
	                 ev: function (t) {
		                 t.operation = t.operation || ["sum"], webix.isArray(t.operation
		                 ) || (t.operation = [t.operation]);
		                 for (var e = [], i = webix.$$(this.config.pivot
		                 ), s = i.jv, n = 0; n < t.operation.length; n++) {
			                 t.color || (t.color = [i.xv(this.kv)]), t.color[n] || t.color.push(i.xv(this.kv));
			                 var r = "<div class='webix_pivot_link' webix_operation='" + n + "'>";
			                 r += "<div class='webix_color_selection'><div style='background-color:" + s(t.color[n]
				                 ) + "'></div></div>", r += "<div class='webix_link_title'>" + t.text + "</div>", r += "<div class='webix_link_selection'>" + s(
					                 t.operation[n]
				                 ) + "</div>", r += "<div class='webix_pivot_minus webix_icon fa-times'></div>", r += "</div>", e.push(
				                 r
			                 )
		                 }
		                 return this.Iv && (this.Iv = !1, this.kv++), e.join(" ")
	                 },
	                 fv: function (t, e) {
		                 var i = {
			                 view: "webix_pivot_chart_popup",
			                 autofit: !0,
			                 autoheight: !0,
			                 width: 150,
			                 data: this.config.operations || []
		                 }, s = webix.ui(i);
		                 s.show(t), s.attachEvent("onHide", webix.bind(function () {
			                                                               var i = webix.html.locate(t, "webix_operation"), n = s.getSelected();
			                                                               null !== n && (this.$$("values").getItem(e).operation[i] = n.name, this.$$("values"
			                                                               ).updateItem(e)), s.close()
		                                                               }, this
		                                          )
		                 )
	                 },
	                 Fv: function (t, e) {
		                 var i = {view: "colorboard", borderless: !0};
		                 webix.$$(this.config.pivot).config.colorboard ? webix.extend(i, webix.$$(this.config.pivot
		                                                                              ).config.colorboard
		                 ) : webix.extend(i,
		                                  {width: 150, height: 150, palette: webix.$$(this.config.pivot).config.palette}
		                 );
		                 var s = webix.ui({view: "popup", id: "colorsPopup", body: i});
		                 return s.show(t), s.getBody().attachEvent("onSelect", function () {s.hide()}), s.attachEvent(
			                 "onHide", webix.bind(function () {
				                                      var i = webix.html.locate(t, "webix_operation"), n = s.getBody().getValue();
				                                      n && (this.$$("values").getItem(e).color[i] = n, this.$$("values").updateItem(e
				                                      )), s.close()
			                                      }, this
			                 )
		                 ), !1
	                 },
	                 gv: function (t, e) {
		                 var i = this.$$("values").getItem(e);
		                 i.operation.push("sum");
		                 {
			                 var s = webix.$$(this.config.pivot);
			                 s.config.palette
		                 }
		                 i.color.push(s.xv(this.kv)), this.$$("values").updateItem(e), webix.delay(function () {
			                                                                                           for (var t = i.operation.length - 1, s = this.$$("values").getItemNode(e
			                                                                                           ).childNodes, n = null, r = 0; r < s.length; r++)if (n = s[r], n.getAttribute) {
				                                                                                           var a = n.getAttribute("webix_operation");
				                                                                                           if (!webix.isUndefined(a) && a == t)break
			                                                                                           }
			                                                                                           null !== n && this.fv(n, e)
		                                                                                           }, this
		                 )
	                 },
	                 hv: function (t, e) {
		                 var i = webix.html.locate(t, "webix_operation"), s = this.$$("values"
		                 ).getItem(e);
		                 return s.operation.length > 1 ? (s.operation.splice(i, 1), this.$$("values").updateItem(e
		                 )) : this.$$("values").remove(e), !1
	                 },
	                 Ev: function (t, e) {
		                 var i = webix.$$(this.config.pivot).jv, s = {
			                 view: "webix_pivot_chart_popup",
			                 autofit: !0,
			                 height: 150,
			                 width: 150,
			                 data: [
				                 {name: "datepicker", title: i("date")}, {
					                 name: "multiselect",
					                 title: i("multiselect")
				                 }, {name: "select", title: i("select")}, {name: "text", title: i("text")}
			                 ]
		                 }, n = webix.ui(s);
		                 n.show(t), n.attachEvent("onHide", webix.bind(function () {
			                                                               var t = n.getSelected();
			                                                               if (null !== t) {
				                                                               var i = this.$$("filters").getItem(e);
				                                                               i.type = t.name, this.$$("filters").updateItem(e)
			                                                               }
			                                                               n.close()
		                                                               }, this
		                                          )
		                 )
	                 },
	                 data_setter: function (t) {
		                 this.$$("fields").clearAll(), this.$$("fields").parse(t.fields), this.$$("fields").filter(
			                 function (t) {
				                 return "id" != t.name
			                 }
		                 ), this.$$("filters").clearAll(), this.$$("filters").parse(t.filters), this.$$("groupBy"
		                 ).clearAll(), this.$$("groupBy").parse(t.groupBy), this.$$("values").clearAll(), this.$$(
			                 "values"
		                 ).parse(t.values)
	                 },
	                 getStructure: function () {
		                 var t = {groupBy: "", values: [], filters: []}, e = this.$$("groupBy");
		                 e.count() && (t.groupBy = e.getItem(e.getFirstId()).name);
		                 var i, s = this.$$("values");
		                 s.data.each(webix.bind(function (e) {
			                                        for (var s = 0; s < e.operation.length; s++)i = webix.copy(e), webix.extend(i, {
				                                                                                                                    operation: e.operation[s],
				                                                                                                                    color: e.color[s] || webix.$$(this.config.pivot).config.color
			                                                                                                                    }, !0
			                                        ), t.values.push(i)
		                                        }, this
		                             )
		                 );
		                 var n = this.$$("filters");
		                 return n.data.each(function (e) {
			                                    t.filters.push(e)
		                                    }
		                 ), t
	                 }
                 }, webix.ui.window, webix.IdSpace
), webix.protoUI({
	                 name: "webix_pivot_chart_popup",
	                 wg: null,
	                 $init: function (t) {webix.extend(t, this.Iu(t)), this.$ready.push(this.av)},
	                 Iu: function (t) {
		                 return {
			                 body: {
				                 id: "list",
				                 view: "list",
				                 borderless: !0,
				                 autoheight: !0,
				                 template: "#title#",
				                 data: t.data
			                 }
		                 }
	                 },
	                 av: function () {
		                 this.attachEvent("onItemClick", function (t) {
			                                  this.wg = this.$eventSource.getItem(t), this.hide()
		                                  }
		                 )
	                 },
	                 getSelected: function () {return this.wg}
                 }, webix.ui.popup, webix.IdSpace
);