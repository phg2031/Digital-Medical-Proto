// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Errors.sol" as Errors; // Pfad zur Fehlerdefinitionsdatei

/// @title Digital Medical Record Prototype
/// @author Philip Göricke

contract DigProt {
    // Struktur zur Speicherung von Patientendaten
    struct PatientFile {
        string ipfsHash; // Der IPFS-Hash der Datei
        uint256 timestamp; // Zeitstempel des Uploads
    }

    // Mapping von Patienten-Wallet-Adresse zu ihren Dateien
    mapping(address => PatientFile[]) private patientFiles;

    // Event, das bei einem neuen Upload ausgelöst wird
    event FileUploaded(
        address indexed patientAddress,
        string ipfsHash,
        uint256 timestamp
    );

    // Funktion zum Hochladen einer Patientendatei
    function uploadPatientFile(string memory _ipfsHash) public {
        PatientFile memory newFile = PatientFile(_ipfsHash, block.timestamp);
        patientFiles[msg.sender].push(newFile);
        emit FileUploaded(msg.sender, _ipfsHash, block.timestamp);
    }

    // Funktion zum Abrufen der Patientendateien einer Wallet-Adresse
    function getPatientFiles(
        address patientAddress
    ) public view returns (PatientFile[] memory) {
        if (msg.sender != patientAddress)
            revert Errors.UnauthorizedAccess(
                "Caller is not authorized to access these data."
            );

        return patientFiles[patientAddress];
    }

    // Weitere Funktionen für Sharing-Code, Dateienauswahl etc.
    // könnten hier hinzugefügt werden ...
}
