import classes from './HeaderImage.module.css'
const headerImage = props => {
    let caption;
    if (props.showCaption) {
        caption = <div className="caption">
            <div>
                <h3>Let's make your life happier</h3>
                <h1>Healthy Living</h1>
                <button onClick={() => props.scrollTo(props.references.teamRef)}
                   className="section-btn btn btn-default smoothScroll">Meet Our
                    Doctors</button>
            </div>
        </div>
    } else {
        caption = <div className="page-title-item-two">
            <h2>{ props.name }</h2>
            <h3 style={{
                fontWeight: '600',
                fontSize: '28px',
                color: 'rgb(57 57 57 / 0.75)',
            }}>{ props.specialty }</h3>
        </div>
    }
    return (<div className={classes.HeaderImage}>
        <section className="slider" ref={props.references.homeRef}>
            <div className="nomar nopad">
                <div className={['item', props.imageClass].join(' ')}>
                    { caption }
                </div>
            </div>
        </section>
    </div>
    );
}
export default headerImage;