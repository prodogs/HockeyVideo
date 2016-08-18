/*
 cycle.js
 2015-02-25

 Public Domain.

 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

 This code should be minified before deployment.
 See http://javascript.crockford.com/jsmin.html

 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
 NOT CONTROL.
 */
/*jslint eval, for */
/*property
 $ref, apply, call, decycle, hasOwnProperty, length, prototype, push,
 retrocycle, stringify, test, toString
 */
if (typeof JSON.decycle !== 'function') {
    JSON.decycle = function decycle(object) {
        'use strict';
        // Make a deep copy of an object or array, assuring that there is at most
        // one instance of each object or array in the resulting structure. The
        // duplicate references (which might be forming cycles) are replaced with
        // an object of the form
        //      {$ref: PATH}
        // where the PATH is a JSONPath string that locates the first occurance.
        // So,
        //      var a = [];
        //      a[0] = a;
        //      return JSON.stringify(JSON.decycle(a));
        // produces the string '[{"$ref":"$"}]'.
        // JSONPath is used to locate the unique object. $ indicates the top level of
        // the object or array. [NUMBER] or [STRING] indicates a child member or
        // property.
        var objects = [], // Keep a reference to each unique object or array
        paths = []; // Keep the path to each unique object or array
        return (function derez(value, path) {
            // The derez recurses through the object, producing the deep copy.
            var i, // The loop counter
            name, // Property name
            nu; // The new object or array
            // typeof null === 'object', so go on if this value is really an object but not
            // one of the weird builtin objects.
            if (typeof value === 'object' && value !== null && !(value instanceof Boolean) && !(value instanceof Date) && !(value instanceof Number) && !(value instanceof RegExp) && !(value instanceof String)) {
                // If the value is an object or array, look to see if we have already
                // encountered it. If so, return a $ref/path object. This is a hard way,
                // linear search that will get slower as the number of unique objects grows.
                for (i = 0; i < objects.length; i += 1) {
                    if (objects[i] === value) {
                        return { $ref: paths[i] };
                    }
                }
                // Otherwise, accumulate the unique value and its path.
                objects.push(value);
                paths.push(path);
                // If it is an array, replicate the array.
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    nu = [];
                    for (i = 0; i < value.length; i += 1) {
                        nu[i] = derez(value[i], path + '[' + i + ']');
                    }
                }
                else {
                    // If it is an object, replicate the object.
                    nu = {};
                    for (name in value) {
                        if (Object.prototype.hasOwnProperty.call(value, name)) {
                            nu[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']');
                        }
                    }
                }
                return nu;
            }
            return value;
        }(object, '$'));
    };
}
if (typeof JSON.retrocycle !== 'function') {
    JSON.retrocycle = function retrocycle($) {
        'use strict';
        // Restore an object that was reduced by decycle. Members whose values are
        // objects of the form
        //      {$ref: PATH}
        // are replaced with references to the value found by the PATH. This will
        // restore cycles. The object will be mutated.
        // The eval function is used to locate the values described by a PATH. The
        // root object is kept in a $ variable. A regular expression is used to
        // assure that the PATH is extremely well formed. The regexp contains nested
        // * quantifiers. That has been known to have extremely bad performance
        // problems on some browsers for very long strings. A PATH is expected to be
        // reasonably short. A PATH is allowed to belong to a very restricted subset of
        // Goessner's JSONPath.
        // So,
        //      var s = '[{"$ref":"$"}]';
        //      return JSON.retrocycle(JSON.parse(s));
        // produces an array containing a single element which is the array itself.
        var px = /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;
        (function rez(value) {
            // The rez function walks recursively through the object looking for $ref
            // properties. When it finds one that has a value that is a path, then it
            // replaces the $ref object with a reference to the value that is found by
            // the path.
            var i, item, name, path;
            if (value && typeof value === 'object') {
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    for (i = 0; i < value.length; i += 1) {
                        item = value[i];
                        if (item && typeof item === 'object') {
                            path = item.$ref;
                            if (typeof path === 'string' && px.test(path)) {
                                value[i] = eval(path);
                            }
                            else {
                                rez(item);
                            }
                        }
                    }
                }
                else {
                    for (name in value) {
                        if (typeof value[name] === 'object') {
                            item = value[name];
                            if (item) {
                                path = item.$ref;
                                if (typeof path === 'string' && px.test(path)) {
                                    value[name] = eval(path);
                                }
                                else {
                                    rez(item);
                                }
                            }
                        }
                    }
                }
            }
        }($));
        return $;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3ljbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjeWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztHQWFHO0FBRUgscUJBQXFCO0FBRXJCOzs7R0FHRztBQUVILEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLE1BQU07UUFDbEMsWUFBWSxDQUFDO1FBRXJCLHlFQUF5RTtRQUN6RSx1RUFBdUU7UUFDdkUseUVBQXlFO1FBQ3pFLHdCQUF3QjtRQUN4QixvQkFBb0I7UUFDcEIsd0VBQXdFO1FBQ3hFLE1BQU07UUFDTixtQkFBbUI7UUFDbkIsaUJBQWlCO1FBQ2pCLCtDQUErQztRQUMvQyx3Q0FBd0M7UUFFeEMsNkVBQTZFO1FBQzdFLHdFQUF3RTtRQUN4RSxZQUFZO1FBRUosSUFBSSxPQUFPLEdBQUcsRUFBRSxFQUFJLGtEQUFrRDtRQUNsRSxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUssK0NBQStDO1FBRW5FLE1BQU0sQ0FBQyxDQUFDLGVBQWUsS0FBSyxFQUFFLElBQUk7WUFFMUMsa0VBQWtFO1lBRXRELElBQUksQ0FBQyxFQUFXLG1CQUFtQjtZQUMvQixJQUFJLEVBQVEsZ0JBQWdCO1lBQzVCLEVBQUUsQ0FBQyxDQUFTLDBCQUEwQjtZQUV0RCwrRUFBK0U7WUFDL0Usb0NBQW9DO1lBRXhCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxZQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxNQUFN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QUM7Z0NBQ2pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDNUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDN0IsQ0FBQztnQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDSixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ2QsQ0FBQzs0QkFDTCxDQUFDO3dCQUNMLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIGN5Y2xlLmpzXG4gMjAxNS0wMi0yNVxuXG4gUHVibGljIERvbWFpbi5cblxuIE5PIFdBUlJBTlRZIEVYUFJFU1NFRCBPUiBJTVBMSUVELiBVU0UgQVQgWU9VUiBPV04gUklTSy5cblxuIFRoaXMgY29kZSBzaG91bGQgYmUgbWluaWZpZWQgYmVmb3JlIGRlcGxveW1lbnQuXG4gU2VlIGh0dHA6Ly9qYXZhc2NyaXB0LmNyb2NrZm9yZC5jb20vanNtaW4uaHRtbFxuXG4gVVNFIFlPVVIgT1dOIENPUFkuIElUIElTIEVYVFJFTUVMWSBVTldJU0UgVE8gTE9BRCBDT0RFIEZST00gU0VSVkVSUyBZT1UgRE9cbiBOT1QgQ09OVFJPTC5cbiAqL1xuXG4vKmpzbGludCBldmFsLCBmb3IgKi9cblxuLypwcm9wZXJ0eSBcbiAkcmVmLCBhcHBseSwgY2FsbCwgZGVjeWNsZSwgaGFzT3duUHJvcGVydHksIGxlbmd0aCwgcHJvdG90eXBlLCBwdXNoLFxuIHJldHJvY3ljbGUsIHN0cmluZ2lmeSwgdGVzdCwgdG9TdHJpbmdcbiAqL1xuXG5pZiAodHlwZW9mIEpTT04uZGVjeWNsZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIEpTT04uZGVjeWNsZSA9IGZ1bmN0aW9uIGRlY3ljbGUob2JqZWN0KSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcblxuLy8gTWFrZSBhIGRlZXAgY29weSBvZiBhbiBvYmplY3Qgb3IgYXJyYXksIGFzc3VyaW5nIHRoYXQgdGhlcmUgaXMgYXQgbW9zdFxuLy8gb25lIGluc3RhbmNlIG9mIGVhY2ggb2JqZWN0IG9yIGFycmF5IGluIHRoZSByZXN1bHRpbmcgc3RydWN0dXJlLiBUaGVcbi8vIGR1cGxpY2F0ZSByZWZlcmVuY2VzICh3aGljaCBtaWdodCBiZSBmb3JtaW5nIGN5Y2xlcykgYXJlIHJlcGxhY2VkIHdpdGhcbi8vIGFuIG9iamVjdCBvZiB0aGUgZm9ybVxuLy8gICAgICB7JHJlZjogUEFUSH1cbi8vIHdoZXJlIHRoZSBQQVRIIGlzIGEgSlNPTlBhdGggc3RyaW5nIHRoYXQgbG9jYXRlcyB0aGUgZmlyc3Qgb2NjdXJhbmNlLlxuLy8gU28sXG4vLyAgICAgIHZhciBhID0gW107XG4vLyAgICAgIGFbMF0gPSBhO1xuLy8gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoSlNPTi5kZWN5Y2xlKGEpKTtcbi8vIHByb2R1Y2VzIHRoZSBzdHJpbmcgJ1t7XCIkcmVmXCI6XCIkXCJ9XScuXG5cbi8vIEpTT05QYXRoIGlzIHVzZWQgdG8gbG9jYXRlIHRoZSB1bmlxdWUgb2JqZWN0LiAkIGluZGljYXRlcyB0aGUgdG9wIGxldmVsIG9mXG4vLyB0aGUgb2JqZWN0IG9yIGFycmF5LiBbTlVNQkVSXSBvciBbU1RSSU5HXSBpbmRpY2F0ZXMgYSBjaGlsZCBtZW1iZXIgb3Jcbi8vIHByb3BlcnR5LlxuXG4gICAgICAgIHZhciBvYmplY3RzID0gW10sICAgLy8gS2VlcCBhIHJlZmVyZW5jZSB0byBlYWNoIHVuaXF1ZSBvYmplY3Qgb3IgYXJyYXlcbiAgICAgICAgICAgIHBhdGhzID0gW107ICAgICAvLyBLZWVwIHRoZSBwYXRoIHRvIGVhY2ggdW5pcXVlIG9iamVjdCBvciBhcnJheVxuXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24gZGVyZXoodmFsdWUsIHBhdGgpIHtcblxuLy8gVGhlIGRlcmV6IHJlY3Vyc2VzIHRocm91Z2ggdGhlIG9iamVjdCwgcHJvZHVjaW5nIHRoZSBkZWVwIGNvcHkuXG5cbiAgICAgICAgICAgIHZhciBpLCAgICAgICAgICAvLyBUaGUgbG9vcCBjb3VudGVyXG4gICAgICAgICAgICAgICAgbmFtZSwgICAgICAgLy8gUHJvcGVydHkgbmFtZVxuICAgICAgICAgICAgICAgIG51OyAgICAgICAgIC8vIFRoZSBuZXcgb2JqZWN0IG9yIGFycmF5XG5cbi8vIHR5cGVvZiBudWxsID09PSAnb2JqZWN0Jywgc28gZ28gb24gaWYgdGhpcyB2YWx1ZSBpcyByZWFsbHkgYW4gb2JqZWN0IGJ1dCBub3Rcbi8vIG9uZSBvZiB0aGUgd2VpcmQgYnVpbHRpbiBvYmplY3RzLlxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAhKHZhbHVlIGluc3RhbmNlb2YgQm9vbGVhbikgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpICYmICEodmFsdWUgaW5zdGFuY2VvZiBOdW1iZXIpICYmICEodmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApICYmICEodmFsdWUgaW5zdGFuY2VvZiBTdHJpbmcpKSB7XG5cbi8vIElmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3Qgb3IgYXJyYXksIGxvb2sgdG8gc2VlIGlmIHdlIGhhdmUgYWxyZWFkeVxuLy8gZW5jb3VudGVyZWQgaXQuIElmIHNvLCByZXR1cm4gYSAkcmVmL3BhdGggb2JqZWN0LiBUaGlzIGlzIGEgaGFyZCB3YXksXG4vLyBsaW5lYXIgc2VhcmNoIHRoYXQgd2lsbCBnZXQgc2xvd2VyIGFzIHRoZSBudW1iZXIgb2YgdW5pcXVlIG9iamVjdHMgZ3Jvd3MuXG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7JHJlZjogcGF0aHNbaV19O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4vLyBPdGhlcndpc2UsIGFjY3VtdWxhdGUgdGhlIHVuaXF1ZSB2YWx1ZSBhbmQgaXRzIHBhdGguXG5cbiAgICAgICAgICAgICAgICBvYmplY3RzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIHBhdGhzLnB1c2gocGF0aCk7XG5cbi8vIElmIGl0IGlzIGFuIGFycmF5LCByZXBsaWNhdGUgdGhlIGFycmF5LlxuXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICAgICAgICAgIG51ID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVbaV0gPSBkZXJleih2YWx1ZVtpXSwgcGF0aCArICdbJyArIGkgKyAnXScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuLy8gSWYgaXQgaXMgYW4gb2JqZWN0LCByZXBsaWNhdGUgdGhlIG9iamVjdC5cblxuICAgICAgICAgICAgICAgICAgICBudSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKG5hbWUgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVbbmFtZV0gPSBkZXJleih2YWx1ZVtuYW1lXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aCArICdbJyArIEpTT04uc3RyaW5naWZ5KG5hbWUpICsgJ10nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0ob2JqZWN0LCAnJCcpKTtcbiAgICB9O1xufVxuXG5cbmlmICh0eXBlb2YgSlNPTi5yZXRyb2N5Y2xlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgSlNPTi5yZXRyb2N5Y2xlID0gZnVuY3Rpb24gcmV0cm9jeWNsZSgkKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcblxuLy8gUmVzdG9yZSBhbiBvYmplY3QgdGhhdCB3YXMgcmVkdWNlZCBieSBkZWN5Y2xlLiBNZW1iZXJzIHdob3NlIHZhbHVlcyBhcmVcbi8vIG9iamVjdHMgb2YgdGhlIGZvcm1cbi8vICAgICAgeyRyZWY6IFBBVEh9XG4vLyBhcmUgcmVwbGFjZWQgd2l0aCByZWZlcmVuY2VzIHRvIHRoZSB2YWx1ZSBmb3VuZCBieSB0aGUgUEFUSC4gVGhpcyB3aWxsXG4vLyByZXN0b3JlIGN5Y2xlcy4gVGhlIG9iamVjdCB3aWxsIGJlIG11dGF0ZWQuXG5cbi8vIFRoZSBldmFsIGZ1bmN0aW9uIGlzIHVzZWQgdG8gbG9jYXRlIHRoZSB2YWx1ZXMgZGVzY3JpYmVkIGJ5IGEgUEFUSC4gVGhlXG4vLyByb290IG9iamVjdCBpcyBrZXB0IGluIGEgJCB2YXJpYWJsZS4gQSByZWd1bGFyIGV4cHJlc3Npb24gaXMgdXNlZCB0b1xuLy8gYXNzdXJlIHRoYXQgdGhlIFBBVEggaXMgZXh0cmVtZWx5IHdlbGwgZm9ybWVkLiBUaGUgcmVnZXhwIGNvbnRhaW5zIG5lc3RlZFxuLy8gKiBxdWFudGlmaWVycy4gVGhhdCBoYXMgYmVlbiBrbm93biB0byBoYXZlIGV4dHJlbWVseSBiYWQgcGVyZm9ybWFuY2Vcbi8vIHByb2JsZW1zIG9uIHNvbWUgYnJvd3NlcnMgZm9yIHZlcnkgbG9uZyBzdHJpbmdzLiBBIFBBVEggaXMgZXhwZWN0ZWQgdG8gYmVcbi8vIHJlYXNvbmFibHkgc2hvcnQuIEEgUEFUSCBpcyBhbGxvd2VkIHRvIGJlbG9uZyB0byBhIHZlcnkgcmVzdHJpY3RlZCBzdWJzZXQgb2Zcbi8vIEdvZXNzbmVyJ3MgSlNPTlBhdGguXG5cbi8vIFNvLFxuLy8gICAgICB2YXIgcyA9ICdbe1wiJHJlZlwiOlwiJFwifV0nO1xuLy8gICAgICByZXR1cm4gSlNPTi5yZXRyb2N5Y2xlKEpTT04ucGFyc2UocykpO1xuLy8gcHJvZHVjZXMgYW4gYXJyYXkgY29udGFpbmluZyBhIHNpbmdsZSBlbGVtZW50IHdoaWNoIGlzIHRoZSBhcnJheSBpdHNlbGYuXG5cbiAgICAgICAgdmFyIHB4ID0gL15cXCQoPzpcXFsoPzpcXGQrfFxcXCIoPzpbXlxcXFxcXFwiXFx1MDAwMC1cXHUwMDFmXXxcXFxcKFtcXFxcXFxcIlxcL2JmbnJ0XXx1WzAtOWEtekEtWl17NH0pKSpcXFwiKVxcXSkqJC87XG5cbiAgICAgICAgKGZ1bmN0aW9uIHJleih2YWx1ZSkge1xuXG4vLyBUaGUgcmV6IGZ1bmN0aW9uIHdhbGtzIHJlY3Vyc2l2ZWx5IHRocm91Z2ggdGhlIG9iamVjdCBsb29raW5nIGZvciAkcmVmXG4vLyBwcm9wZXJ0aWVzLiBXaGVuIGl0IGZpbmRzIG9uZSB0aGF0IGhhcyBhIHZhbHVlIHRoYXQgaXMgYSBwYXRoLCB0aGVuIGl0XG4vLyByZXBsYWNlcyB0aGUgJHJlZiBvYmplY3Qgd2l0aCBhIHJlZmVyZW5jZSB0byB0aGUgdmFsdWUgdGhhdCBpcyBmb3VuZCBieVxuLy8gdGhlIHBhdGguXG5cbiAgICAgICAgICAgIHZhciBpLCBpdGVtLCBuYW1lLCBwYXRoO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB2YWx1ZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGggPSBpdGVtLiRyZWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJyAmJiBweC50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlW2ldID0gZXZhbChwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXooaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChuYW1lIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlW25hbWVdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB2YWx1ZVtuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoID0gaXRlbS4kcmVmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnICYmIHB4LnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlW25hbWVdID0gZXZhbChwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJleihpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSgkKSk7XG4gICAgICAgIHJldHVybiAkO1xuICAgIH07XG59XG4iXX0=