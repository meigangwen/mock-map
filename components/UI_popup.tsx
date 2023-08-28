export default function Popup(props){
    return (
    
        <div id="popUp" className="bg-black bg-opacity-75 fixed px-4 py-2 rounded-lg z-10 left-20">
            <h2 className="text-white text-xs">
                <span id="population"></span>
                <span> Population</span>
            </h2>
            <p id="populationValue" className="text-white font-bold text-lg">300 million</p>
        </div>
    )
}