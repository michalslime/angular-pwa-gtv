import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;
  let httpTestingController: HttpTestingController;
  const testUrl = 'https://random.imagecdn.app/v1/image?width=500&height=150';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService]
    });

    service = TestBed.inject(ImageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getImageUrl() should return expected text response', () => {
    const mockImageResponse = 'https://example.com/image.jpg';

    service.getImageUrl().subscribe(data => {
      expect(data).toEqual(mockImageResponse, 'should return expected image url as text');
    });

    // Expect a call to this URL and respond with mock text
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('text');
    req.flush(mockImageResponse); 
  });
});
