import './Service.css';

function Service(props) {
    return (
        <div className="service">
            <p className="text">{props.serviceInfo}</p>
        </div>
    );
}

export default Service;