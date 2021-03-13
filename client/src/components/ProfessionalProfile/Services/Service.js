function Service({service}) {
    return (
        <div className="service">
            <p className="text">{service.title}</p>
            <p className="text">{service.desciption}</p>
            <p className="text">£{service.price}</p>
        </div>
    );
}

export default Service;