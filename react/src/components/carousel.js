import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const CarouslPage=()=>{
    return(
        <>
          <div className="modal " tabIndex="-1" id="carousel">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-center">IMAGE GALLERY</h5>
                  <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <Carousel showThumbs={false} infiniteLoop={true} >
                        <div>
                            <img src="/images/edureka.png" alt="" />
                        </div>
                        <div><img src="/images/edureka.png" alt="" /></div>
                        <div><img src="/images/edureka.png" alt="" /></div>
                    </Carousel>
                    
                 
                </div>
              </div>
            </div>
          </div>
        </>
    )

}
export default CarouslPage;