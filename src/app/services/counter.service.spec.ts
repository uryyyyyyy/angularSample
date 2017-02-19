import {BaseRequestOptions, Http, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {CounterService, messageEndPoint} from './counter.service';
import {Observable} from 'rxjs/Rx';

describe('CounterService', () => {

  const defaultOptions = new BaseRequestOptions();

  it('increment() should increase point', () => {
    const service = new CounterService(null);
    service.increment(3);
    expect(service.point.getValue()).toBe(3);
  });

  it('asyncIncrement() should query url', () => {
    const httpMock: any = {get: () => null};
    spyOn(httpMock, 'get').and.returnValue(Observable.of());
    const service = new CounterService(httpMock);
    service.fetchNumber().subscribe();
    expect(httpMock.get).toHaveBeenCalledTimes(1);
    expect(httpMock.get).toHaveBeenCalledWith(messageEndPoint, jasmine.any(Object));
  });

  it('asyncIncrement() should increase point', () => {
    const backend = new MockBackend();
    const service = new CounterService(new Http(backend, defaultOptions));
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: JSON.stringify({num: 100})
      })));
    });
    expect(service.point.getValue()).toBe(0);
    service.asyncIncrement().subscribe();
    expect(service.point.getValue()).toBe(100);
  });

  it('asyncIncrement() should fail with bad response', () => {
    const backend = new MockBackend();
    const service = new CounterService(new Http(backend, defaultOptions));
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 400,
        body: JSON.stringify({error: 'WTF'})
      })));
    });
    service.asyncIncrement().subscribe(null, (err: string) => {
      expect(err).toBe(`response.status is bad: 400`);
    });
  });
});
