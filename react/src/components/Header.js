

const Header=()=>{
    let GetloginResult=(res)=>{
        console.log(res)
    }

    return(
        <>
          
       
                <header className="navigation-bar">
        <p className="navigation-bar-logo">e!</p>
        <section className="navigation-bar-button">
            <div className="bg-light d-flex align-items-center rounded-5 px-3 text-danger ">
                <p className="fa-solid fa-user my-0 me-2"></p>
                <p className="m-0">Praveen</p>
            </div>
            <button className="navigation-bar-button-login" data-bs-toggle="modal" data-bs-target="#login">Login</button>
        <button className="navigation-bar-button-caccount" data-bs-toggle="modal" data-bs-target="#create-account">Create an account</button></section>
    </header>
        </>
    );
};
export default Header;