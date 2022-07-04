import { expect,assert } from "chai"
import { ethers } from "hardhat"
import {SimpleStorage,SimpleStorage__factory} from "../typechain-types"

describe("SimpleStorage", function () {
  let simpleStorageFactory:SimpleStorage__factory
  let simpleStorage:SimpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory
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
