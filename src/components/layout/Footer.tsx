const Footer = () => {
  return (
    <div className="bg-black h-[100vh] w-full text-white">
      <div className=" items-center justify-center flex">
        <div className="roboto md:text-[250px]">LAKSHYA'25</div>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:ml-10 mx-auto">
          <p className="text-3xl mb-1  font-bold">CONTACT</p>
          <ul className="text-xl font-light">
            <li>hello</li>
            <li>bye</li>
            <li>hi</li>
          </ul>
        </div>

        <div className="mx-auto">
          <p className="text-3xl mb-1 font-bold">CONTACT</p>
          <ul className="text-xl font-light">
            <li>hello</li>
            <li>bye</li>
            <li>hi</li>
          </ul>
        </div>

        <div className="mx-auto">
          <p className="text-3xl mb-1 font-bold">CONTACT</p>
          <ul className="text-xl  font-light">
            <li>hello</li>
            <li>bye</li>
            <li>hi</li>
          </ul>
        </div>

        <div className="md:mr-10 mx-auto">
          <p className="text-3xl mb-1 font-bold">CONTACT</p>
          <ul className="text-xl font-light">
            <li>hello</li>
            <li>bye</li>
            <li>hi</li>
          </ul>
        </div>
      </div>

      <div className=" mt-14 text-[10px] flex flex-col md:flex-row justify-center">
        <p className="">&copy; COPYRIGHT 2025 POORNIMA UNIVERSITY, </p>
        <p> ALL RIGHT RESERVED</p>
      </div>
    </div>
  );
};

export default Footer;
