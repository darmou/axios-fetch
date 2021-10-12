"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAxiosFetch = void 0;
const node_fetch_1 = require("node-fetch");
const form_data_1 = __importDefault(require("form-data"));
/**
 * A Fetch WebAPI implementation based on the Axios client
 */
async function axiosFetch(axios, 
// Convert the `fetch` style arguments into a Axios style config
transformer, input, init = {}) {
    const rawHeaders = init.headers || {};
    const lowerCasedHeaders = Object.keys(rawHeaders).filter(key => rawHeaders[key])
        .reduce((acc, key) => {
        acc[key.toLowerCase()] = rawHeaders[key];
        return acc;
    }, {});
    if (!('content-type' in lowerCasedHeaders)) {
        lowerCasedHeaders['content-type'] = 'text/plain;charset=UTF-8';
    }
    const rawConfig = {
        url: input,
        method: init.method || 'GET',
        data: typeof init.body === 'undefined' || init.body instanceof form_data_1.default ? init.body : String(init.body),
        headers: lowerCasedHeaders,
        // Force the response to an arraybuffer type. Without this, the Response
        // object will try to guess the content type and add headers that weren't in
        // the response.
        // NOTE: Don't use 'stream' because it's not supported in the browser
        responseType: 'arraybuffer'
    };
    const config = transformer ? transformer(rawConfig, input, init) : rawConfig;
    let result;
    try {
        result = await axios.request(config);
    }
    catch (err) {
        if (err.response) {
            result = err.response;
        }
        else {
            throw err;
        }
    }
    const fetchHeaders = new node_fetch_1.Headers(result.headers);
    return new node_fetch_1.Response(result.data, {
        status: result.status,
        statusText: result.statusText,
        headers: fetchHeaders
    });
}
function buildAxiosFetch(axios, transformer) {
    return axiosFetch.bind(undefined, axios, transformer);
}
exports.buildAxiosFetch = buildAxiosFetch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyQ0FBK0Q7QUFDL0QsMERBQWlDO0FBY2pDOztHQUVHO0FBQ0gsS0FBSyxVQUFVLFVBQVUsQ0FDdkIsS0FBb0I7QUFDcEIsZ0VBQWdFO0FBQ2hFLFdBQThCLEVBQzlCLEtBQWMsRUFDZCxPQUFrQixFQUFFO0lBRXBCLE1BQU0sVUFBVSxHQUEyQixJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUM5RCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzdFLE1BQU0sQ0FDTCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNYLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLEVBQ0QsRUFBRSxDQUNILENBQUM7SUFFSixJQUFJLENBQUMsQ0FBQyxjQUFjLElBQUksaUJBQWlCLENBQUMsRUFBRTtRQUMxQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRywwQkFBMEIsQ0FBQztLQUNoRTtJQUVELE1BQU0sU0FBUyxHQUF1QjtRQUNwQyxHQUFHLEVBQUUsS0FBSztRQUNWLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUs7UUFDNUIsSUFBSSxFQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksWUFBWSxtQkFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2RyxPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLHdFQUF3RTtRQUN4RSw0RUFBNEU7UUFDNUUsZ0JBQWdCO1FBQ2hCLHFFQUFxRTtRQUNyRSxZQUFZLEVBQUUsYUFBYTtLQUM1QixDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBRTdFLElBQUksTUFBTSxDQUFDO0lBQ1gsSUFBSTtRQUNGLE1BQU0sR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdEM7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUNoQixNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztTQUN2QjthQUFNO1lBQ0wsTUFBTSxHQUFHLENBQUM7U0FDWDtLQUNGO0lBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxvQkFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV0RCxPQUFPLElBQUkscUJBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQy9CLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtRQUNyQixVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVU7UUFDN0IsT0FBTyxFQUFFLFlBQVk7S0FDdEIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQWdCLGVBQWUsQ0FBRSxLQUFvQixFQUFFLFdBQThCO0lBQ25GLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFGRCwwQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc3BvbnNlLCBIZWFkZXJzIGFzIEZldGNoSGVhZGVycyB9IGZyb20gJ25vZGUtZmV0Y2gnO1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJ2Zvcm0tZGF0YSc7XG5pbXBvcnQgeyBBeGlvc0luc3RhbmNlLCBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaEluaXQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcbiAgaGVhZGVycz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIG1ldGhvZD86IEF4aW9zUmVxdWVzdENvbmZpZ1snbWV0aG9kJ107XG4gIGJvZHk/OiBGb3JtRGF0YSB8IGFueTtcbiAgZXh0cmE/OiBhbnk7XG59XG5cbmV4cG9ydCB0eXBlIEF4aW9zVHJhbnNmb3JtZXIgPSAoY29uZmlnOiBBeGlvc1JlcXVlc3RDb25maWcsIGlucHV0OiBzdHJpbmcgfCB1bmRlZmluZWQsIGluaXQ6IEZldGNoSW5pdCkgPT4gQXhpb3NSZXF1ZXN0Q29uZmlnO1xuXG5leHBvcnQgdHlwZSBBeGlvc0ZldGNoID0gKGlucHV0Pzogc3RyaW5nLCBpbml0PzogRmV0Y2hJbml0KSA9PiBQcm9taXNlPFJlc3BvbnNlPjtcblxuLyoqXG4gKiBBIEZldGNoIFdlYkFQSSBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiB0aGUgQXhpb3MgY2xpZW50XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGF4aW9zRmV0Y2ggKFxuICBheGlvczogQXhpb3NJbnN0YW5jZSxcbiAgLy8gQ29udmVydCB0aGUgYGZldGNoYCBzdHlsZSBhcmd1bWVudHMgaW50byBhIEF4aW9zIHN0eWxlIGNvbmZpZ1xuICB0cmFuc2Zvcm1lcj86IEF4aW9zVHJhbnNmb3JtZXIsXG4gIGlucHV0Pzogc3RyaW5nLFxuICBpbml0OiBGZXRjaEluaXQgPSB7fVxuKSB7XG4gIGNvbnN0IHJhd0hlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSBpbml0LmhlYWRlcnMgfHwge307XG4gIGNvbnN0IGxvd2VyQ2FzZWRIZWFkZXJzID0gT2JqZWN0LmtleXMocmF3SGVhZGVycykuZmlsdGVyKGtleSA9PiByYXdIZWFkZXJzW2tleV0pXG4gICAgLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PihcbiAgICAgIChhY2MsIGtleSkgPT4ge1xuICAgICAgICBhY2Nba2V5LnRvTG93ZXJDYXNlKCldID0gcmF3SGVhZGVyc1trZXldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSxcbiAgICAgIHt9XG4gICAgKTtcblxuICBpZiAoISgnY29udGVudC10eXBlJyBpbiBsb3dlckNhc2VkSGVhZGVycykpIHtcbiAgICBsb3dlckNhc2VkSGVhZGVyc1snY29udGVudC10eXBlJ10gPSAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JztcbiAgfVxuXG4gIGNvbnN0IHJhd0NvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnID0ge1xuICAgIHVybDogaW5wdXQsXG4gICAgbWV0aG9kOiBpbml0Lm1ldGhvZCB8fCAnR0VUJyxcbiAgICBkYXRhOiB0eXBlb2YgaW5pdC5ib2R5ID09PSAndW5kZWZpbmVkJyB8fCBpbml0LmJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSA/IGluaXQuYm9keSA6IFN0cmluZyhpbml0LmJvZHkpLFxuICAgIGhlYWRlcnM6IGxvd2VyQ2FzZWRIZWFkZXJzLFxuICAgIC8vIEZvcmNlIHRoZSByZXNwb25zZSB0byBhbiBhcnJheWJ1ZmZlciB0eXBlLiBXaXRob3V0IHRoaXMsIHRoZSBSZXNwb25zZVxuICAgIC8vIG9iamVjdCB3aWxsIHRyeSB0byBndWVzcyB0aGUgY29udGVudCB0eXBlIGFuZCBhZGQgaGVhZGVycyB0aGF0IHdlcmVuJ3QgaW5cbiAgICAvLyB0aGUgcmVzcG9uc2UuXG4gICAgLy8gTk9URTogRG9uJ3QgdXNlICdzdHJlYW0nIGJlY2F1c2UgaXQncyBub3Qgc3VwcG9ydGVkIGluIHRoZSBicm93c2VyXG4gICAgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInXG4gIH07XG5cbiAgY29uc3QgY29uZmlnID0gdHJhbnNmb3JtZXIgPyB0cmFuc2Zvcm1lcihyYXdDb25maWcsIGlucHV0LCBpbml0KSA6IHJhd0NvbmZpZztcblxuICBsZXQgcmVzdWx0O1xuICB0cnkge1xuICAgIHJlc3VsdCA9IGF3YWl0IGF4aW9zLnJlcXVlc3QoY29uZmlnKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyci5yZXNwb25zZSkge1xuICAgICAgcmVzdWx0ID0gZXJyLnJlc3BvbnNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZmV0Y2hIZWFkZXJzID0gbmV3IEZldGNoSGVhZGVycyhyZXN1bHQuaGVhZGVycyk7XG5cbiAgcmV0dXJuIG5ldyBSZXNwb25zZShyZXN1bHQuZGF0YSwge1xuICAgIHN0YXR1czogcmVzdWx0LnN0YXR1cyxcbiAgICBzdGF0dXNUZXh0OiByZXN1bHQuc3RhdHVzVGV4dCxcbiAgICBoZWFkZXJzOiBmZXRjaEhlYWRlcnNcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEF4aW9zRmV0Y2ggKGF4aW9zOiBBeGlvc0luc3RhbmNlLCB0cmFuc2Zvcm1lcj86IEF4aW9zVHJhbnNmb3JtZXIpOiBBeGlvc0ZldGNoIHtcbiAgcmV0dXJuIGF4aW9zRmV0Y2guYmluZCh1bmRlZmluZWQsIGF4aW9zLCB0cmFuc2Zvcm1lcik7XG59XG4iXX0=