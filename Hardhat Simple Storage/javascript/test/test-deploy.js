const { expect,assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

    simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()
  })

  it("Should start with a favorite number of 0",async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = 0
    assert.equal(currentValue.toString(), expectedValue.toString())
  })
  // it.only("Should update when we call store",async function () {
  it("Should update when we call store",async function () {
    const expectedValue = "7"
    const transaction = await simpleStorage.store(expectedValue)
    await transaction.wait(1)
    const currentValue = await simpleStorage.retrieve()
    // assert.equal(currentValue.toString(), expectedValue)
    expect(currentValue).to.equal(expectedValue)
  })
});
