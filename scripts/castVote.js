const hre = require("hardhat");
const { ethers } = hre;

async function main() {
    const votingContractAddress = "0x25eA20ca3197fBaF40c29B45e397A4dF8F66549F"; // replace with deployed address
    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = Voting.attach(votingContractAddress);

    console.log("Submitting vote...");

    const proofHexStrings = [
        "0x03ef1a62e6541a139505f1603293ed45512b15753f744d164fbd9fac89c02138",
        "0x0207076d85f8df0fffe5add52d50d828e60ed521086ad49fae73cdb8a02dbf5e",
        "0x16847e039e1246520b3017c5f93fcda362d8909915322f2c64601055c25cbc44",
        "0x208ecb0536af5d7e3cd7253d54f750df08697861e105d3bb1ec7a4545b8b5c26",
        "0x2221e97bd4225b664f4783906aede8f2970ae3b69adf9bcafa168995d8fa9f62",
        "0x0edf340abc8b969c291956547cd76f6501c5a6e9ed71477c2861665bb1748929",
        "0x2bd8b57fd0d9fa8168e15a57d583ba215b803099b5e75bd6bf09f279cf600109",
        "0x2a4402b8930e051859487ae2f0a14bb23949e92055cd24307093064f2a7d835a",
        "0x0872f5df756daeb8669fe19a5d19ded50998eb9b7f61d53cec246aad17a7955b",
        "0x1b8951f96e12981c8e6109c3d761ae790e8d81e1168906e42c808fbb0ed1913a",
        "0x05061a5783f4776a504a3d5614d9041da35adb65faa2d929a22f545baf060739",
        "0x1ab403d7c1c699bfa2b6f48b298f09c2a94f6f459b21d83f2a61116c13743b5a",
        "0x23d9859de89b3cba57510188cecb114c0d8e19d5d08105ea147b89e8b1f8a16a",
        "0x3037f9e2c5ec60f4abc6347f4463ffce45507d9b6887185440845bce6f3100f8",
        "0x085466fdcbfed9278ee297c5366608c8ca28bc7f248cf6ac450f426db134790e",
        "0x272ed52ce9d01473039ba67dac79eb7d7871c26bbf7da8285d5c61a31a150828",
        "0x1e8ad2abd51217af67ff8cdfe2101eaf25067dcf10f682dc8e81c101445406b9",
        "0x0af6ee97c45649435ab2af24861e0de552e2240f0d18ea7452a75e4a09d74212",
        "0x0f5d350c5e7a80576427bc7216fd67424e4c7a38d851b7c6260fd0e46628b6a8",
        "0x2d0051c4c0b5065b23d2d01a0b40651fc9053f2f065f04d09c1910f2e7ce701d",
        "0x1b5ce8a5f7f2fbf5f25d9d7b9920498af59213b705445cb2f8c1eef255c5c8c6",
        "0x1f1175b7e93180106374d6b85fd53a8df104e0db790da51ebb06df436112fc02",
        "0x1ec49e982dc0071379bf61daa2356eb64779947a2ccb27dbe0223962e2423904",
        "0x0611bad7228233eac95cd8f0a01aa7c992d45dfd8cdbfefb8e2c0d152532788e"
    ];

    // Concatenate all proofs into a single Uint8Array
    const concatenatedProof = ethers.utils.concat(
        proofHexStrings.map(ethers.utils.arrayify)
    );

    const pubSignals = ["1"]; 

    const tx = await voting.castVote(concatenatedProof, pubSignals, { gasLimit: 5000000 });
    console.log("Vote submitted! TX hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Gas used:", receipt.gasUsed.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
